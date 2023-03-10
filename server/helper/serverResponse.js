import logger from './logger';

/**
 * @name serverResponse
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Number} code status code to return
 * @param {Object} data object with response details
 * @returns {JSON} JSON response with status and response information
 */
const serverResponse = (req, res, code, data) => {
  logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}- ${code} - ${JSON.stringify(data)}
  `);

  res.status(code).json({ ...data });
};

/**
 * @name serverError
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {error} error the error message
 * @returns {JSON} JSON response with server error details
 */
const serverError = (req, res, error) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip} - ${error}
  `);
  res.status(500).json({
    error: error.message
  });
};

export { serverResponse, serverError };