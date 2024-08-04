// dependencies
import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { isEmail } from "../helpers/helpers.js";
import prisma from "../prisma/prismaClient.js";

// create tokenVerify middleware
const tokenVerifyMiddleware = async (req, res, next) => {
  // get accessToken from cookie
  const token = req.cookies.accessToken;

  // check if have no token
  if (!token) {
    return res.status(401).json({ status: "error", message: "Unathorized" });
  }

  // verify token
  const verifyToken = jwt.verify(
    token,
    process.env.USER_LOGIN_JWT_STRING,
    AsyncHandler(async (error, decode) => {
      // if token is invalid then will return error
      if (error) {
        return res.status(400).json({ status: "error", message: "Invalid token!" });
      }

      // get logged-in user data
      const email = decode.email;
      let me = null;

      if (isEmail(email)) {
        me = await prisma.users.findUnique({
          where: {
            email,
          },
          include: {
            meta: true,
          },
        });
      } else {
        return res.status(400).json({ status: "error", message: "Invalid email address" });
      }

      // if user info not found, return error 
      if(!me){
        // as user reached here, so have any accessToken, that's why removing accessToken
        res.clearCookie("accessToken");

        // send error response
        return res.status(400).json({ status: "error",message: "Unathorized!" });
      }

      // send login data to controller
      req.me = me;

      // proceed to controller
      next();
    })
  );
};

// export
export default tokenVerifyMiddleware;
