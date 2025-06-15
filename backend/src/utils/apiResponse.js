class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Response message
   * @param {Object} data - Main payload
   * @param {boolean} [success] - Explicit success flag (optional)
   */
  constructor(statusCode, message = "Success", data = {}, success = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success !== null ? success : statusCode < 400;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      data: this.data,
    };
  }
}

export default ApiResponse;
