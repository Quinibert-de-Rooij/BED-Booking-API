const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message:
      "Q says: 500 internal server error; Something went wrong on the server.",
  });
};

export default errorHandler;
