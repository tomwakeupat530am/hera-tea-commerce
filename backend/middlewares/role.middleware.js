
// Role-based authorization middleware

// Check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

// Check if user is an affiliate
const isAffiliate = (req, res, next) => {
  if (req.user && req.user.isAffiliate) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an affiliate' });
  }
};

module.exports = { isAdmin, isAffiliate };
