
const crypto = require('crypto');

// Generate a unique referral code
const generateReferralCode = (name) => {
  // Get initials from name (first letter of each word)
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
  
  // Generate a random string (4 characters)
  const randomStr = crypto.randomBytes(2).toString('hex').toUpperCase();
  
  // Combine initials and random string
  const referralCode = `${initials}${randomStr}`;
  
  return referralCode;
};

// Calculate affiliate commission
const calculateCommission = (orderTotal, commissionRate = 0.35) => {
  return Math.floor(orderTotal * commissionRate);
};

module.exports = {
  generateReferralCode,
  calculateCommission,
};
