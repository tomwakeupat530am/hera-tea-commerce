
/**
 * Calculate affiliate commission for an order
 * @param {Number} orderTotal - Total order amount
 * @param {Number} commissionRate - Commission rate (default: 0.35 or 35%)
 * @returns {Number} - Calculated commission amount
 */
const calculateCommission = (orderTotal, commissionRate = 0.35) => {
  return Math.round(orderTotal * commissionRate);
};

/**
 * Generate a unique referral code
 * @param {String} name - User's name
 * @returns {String} - Generated referral code
 */
const generateReferralCode = (name) => {
  // Generate a unique referral code based on user's name and a random string
  const nameInitials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `HERA-${nameInitials}${randomStr}`;
};

/**
 * Validate a referral code format
 * @param {String} code - Referral code to validate
 * @returns {Boolean} - Is valid or not
 */
const isValidReferralCode = (code) => {
  // Basic validation - in a real app, add more checks
  return code && typeof code === 'string' && code.length >= 8;
};

module.exports = {
  calculateCommission,
  generateReferralCode,
  isValidReferralCode,
};
