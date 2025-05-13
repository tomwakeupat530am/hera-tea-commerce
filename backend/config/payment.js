
// Payment gateway configurations
const paymentConfig = {
  // VNPAY configuration
  vnpay: {
    tmnCode: process.env.VNPAY_TMN_CODE,
    hashSecret: process.env.VNPAY_HASH_SECRET,
    vnpUrl: process.env.VNPAY_URL,
    returnUrl: process.env.VNPAY_RETURN_URL,
  },
  
  // MoMo configuration
  momo: {
    partnerCode: process.env.MOMO_PARTNER_CODE,
    accessKey: process.env.MOMO_ACCESS_KEY,
    secretKey: process.env.MOMO_SECRET_KEY,
    paymentUrl: process.env.MOMO_PAYMENT_URL,
    returnUrl: process.env.MOMO_RETURN_URL,
    notifyUrl: process.env.MOMO_NOTIFY_URL,
  }
};

module.exports = paymentConfig;
