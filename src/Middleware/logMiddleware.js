import logger from "../Utils/log.js";

//middleware for logging

const log = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;
  logger.info(
    `${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`
  );
};

export default log;
