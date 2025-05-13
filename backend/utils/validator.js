
const validator = {
  // Validate email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  // Validate phone number
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  },
  
  // Validate password
  isValidPassword: (password) => {
    // Must be at least 6 characters
    return password && password.length >= 6;
  },
  
  // Validate Vietnamese name
  isValidVietnameseName: (name) => {
    // Check if name contains at least one letter
    // and allows for Vietnamese characters, spaces, and hyphens
    const nameRegex = /^[a-zA-ZÀ-ỹ\s\-]+$/;
    return nameRegex.test(name) && name.length >= 2;
  },
  
  // Validate referral code
  isValidReferralCode: (code) => {
    // Referral code format: 2-4 letters followed by 4 alphanumeric characters
    const referralRegex = /^[A-Z]{2,4}[A-Z0-9]{4}$/;
    return referralRegex.test(code);
  }
};

module.exports = validator;
