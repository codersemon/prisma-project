// dependencies
import colors from "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";

// import routes
import userRoute from "./route/user.js";
import authRoute from "./route/auth.js";
import cartRoute from "./route/cart.js";
import productRoute from "./route/product.js";
import mediaRoute from "./route/media.js";
import orderRoute from "./route/order.js";
import wishlistRoute from "./route/wishlist.js";
import productReviewRoute from "./route/productReview.js";

// init express app & colors
const app = express();
colors.enable();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static directory
app.use(express.static("public/"));

// misc middlewares
app.use(cookieParser());

// Cross Origin Support for REST API Access
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// routes middlewares
app.use("/api/v1", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/", productRoute);
app.use("/api/v1/", cartRoute);
app.use("/api/v1/", mediaRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", wishlistRoute);
app.use("/api/v1", productReviewRoute);

// PORT
const PORT = process.env.SERVER_PORT || 6060;

// error handler middlewares
app.use(errorHandler);

// listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgBlue.black);
});
