import { __node_env } from "../constant.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // sometimes error appear at 200, set it to other code
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: __node_env === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
