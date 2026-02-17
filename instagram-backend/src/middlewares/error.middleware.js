const errorMiddleware = (err, req, res, next) => {
  console.log("error message->", err.message);

  let statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || "Internal server error",
    success: false,
  });
};

module.exports = errorMiddleware;
