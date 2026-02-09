export const errorMiddleware = (err, req, res) => {
  console.log("error middleware", err.message);

  let statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || "Internal server error",
    success: false,
  });
};
