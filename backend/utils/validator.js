
const validator = {
  /**
   * Validate email format
   * @param {String} email - Email to validate
   * @returns {Boolean} - Is valid or not
   */
  isValidEmail: (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number format (Vietnamese)
   * @param {String} phone - Phone number to validate
   * @returns {Boolean} - Is valid or not
   */
  isValidPhone: (phone) => {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate password strength
   * @param {String} password - Password to validate
   * @returns {Boolean} - Is valid or not
   */
  isStrongPassword: (password) => {
    return password && password.length >= 6;
  },

  /**
   * Validate if input is empty
   * @param {String} value - Value to check
   * @returns {Boolean} - Is empty or not
   */
  isEmpty: (value) => {
    return value === undefined || value === null || value.trim() === '';
  },

  /**
   * Validate if input is a number
   * @param {any} value - Value to check
   * @returns {Boolean} - Is number or not
   */
  isNumber: (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  /**
   * Sanitize input to prevent XSS
   * @param {String} input - Input to sanitize
   * @returns {String} - Sanitized input
   */
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
};

module.exports = validator;
