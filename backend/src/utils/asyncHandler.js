import { logger } from "../../libs/logger.js";

/**
 * Wraps an async Express route handler and catches unhandled errors.
 * @param {Function} requestHandler - The async handler to wrap.
 * @returns {Function} A new handler with error handling.
 */
function AsyncHandler(requestHandler) {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      logger?.error?.(`AsyncHandler caught: ${err.stack || err.message || err}`);
      next(err);
    });
  };
}

export default AsyncHandler;
