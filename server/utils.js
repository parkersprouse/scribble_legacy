/** @module utils */
'use strict';

module.exports = {

  /**
   * Utility method to cleanly resolve a promise.
   * @function
   * @param {promise} promise - The promise to be resolved.
   * @returns {array} The result of the resolved promise.
   */
  call(promise) {
    return promise
      .then(data => [null, data])
      .catch(err => [err]);
  },

  /**
   * Utility method to create a payload to use in a JWT.
   * @function
   * @param {object} data - The data to convert to a JWT payload.
   * @returns {object} The payload to create the JWT out of.
   */
  generateJwtPayload(data) {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      pw_hash: data.pw_hash
    }
  },

  /**
   * Utility method to cleanly respond to a client request.
   * @function
   * @param {object} res - The server's response.
   * @param {number} status - The HTTP response status code.
   * @param {string} message - The message to send with the response.
   * @param {any} content - The body to send with the response.
   * @returns {void}
   */
  respond(res, status, message, content) {
    res.status(status).json({ message, content });
  },

  /**
   * Utility method to check if a user's authentication JWT is valid.
   * @function
   * @param {object} decoded - The decoded JWT to compare to the user's data.
   * @param {object} data - The user's data to compare to the token's data.
   * @returns {boolean} If the provided token is valid.
   */
  tokenValid(decoded, data) {
    return (decoded.pw_hash === data.pw_hash) &&
           (decoded.email === data.email) &&
           (decoded.name === data.name)
  }

};
