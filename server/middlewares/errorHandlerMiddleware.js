/**
 * @description error handler middleware by 'express-async-handler' package 
 * @param {*} error - this will catch errors 
 * @param {*} req
 * @param {*} res 
 * @param {*} next 
 */
const errorHandler = (error, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status).json({ message: error.message });
  };
  
  // export
  export default errorHandler;