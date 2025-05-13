
const crypto = require('crypto');
const axios = require('axios');
const paymentConfig = require('../config/payment');

// VNPAY Payment Service
const vnpay = {
  // Create payment URL for VNPAY
  createPaymentUrl: (orderId, amount, orderInfo, returnUrl) => {
    const date = new Date();
    const createDate = date.toISOString().split('T')[0].split('-').join('') + 
      date.getHours().toString().padStart(2, '0') + 
      date.getMinutes().toString().padStart(2, '0') + 
      date.getSeconds().toString().padStart(2, '0');
    
    // Prepare data for VNPAY
    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: paymentConfig.vnpay.tmnCode,
      vnp_Amount: amount * 100, // Convert to smallest currency unit
      vnp_CreateDate: createDate,
      vnp_CurrCode: 'VND',
      vnp_IpAddr: '127.0.0.1', // Should be dynamically set in production
      vnp_Locale: 'vn',
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'other',
      vnp_ReturnUrl: returnUrl || paymentConfig.vnpay.returnUrl,
      vnp_TxnRef: orderId,
    };
    
    // Sort params
    const sortedParams = sortObject(vnp_Params);
    
    // Create signature
    const signData = Object.keys(sortedParams)
      .map(key => `${key}=${sortedParams[key]}`)
      .join('&');
    
    const hmac = crypto.createHmac('sha512', paymentConfig.vnpay.hashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    
    // Add signature
    sortedParams.vnp_SecureHash = signed;
    
    // Create URL with params
    const vnpUrl = paymentConfig.vnpay.vnpUrl + '?' + 
      Object.keys(sortedParams)
        .map(key => `${key}=${encodeURIComponent(sortedParams[key])}`)
        .join('&');
    
    return vnpUrl;
  },
  
  // Verify VNPAY return data
  verifyReturnData: (vnpParams) => {
    // Check required params
    const requiredFields = ['vnp_Amount', 'vnp_BankCode', 'vnp_BankTranNo', 
      'vnp_CardType', 'vnp_OrderInfo', 'vnp_PayDate', 'vnp_ResponseCode', 
      'vnp_TmnCode', 'vnp_TransactionNo', 'vnp_TxnRef', 'vnp_SecureHash'];
    
    for (const field of requiredFields) {
      if (!vnpParams[field]) {
        return {
          isSuccess: false,
          message: `Missing ${field} parameter`,
        };
      }
    }
    
    // Verify signature
    const secureHash = vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;
    
    const sortedParams = sortObject(vnpParams);
    const signData = Object.keys(sortedParams)
      .map(key => `${key}=${sortedParams[key]}`)
      .join('&');
    
    const hmac = crypto.createHmac('sha512', paymentConfig.vnpay.hashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    
    if (secureHash !== signed) {
      return {
        isSuccess: false,
        message: 'Invalid signature',
      };
    }
    
    // Check response code (00 = success)
    const isSuccess = vnpParams.vnp_ResponseCode === '00';
    
    return {
      isSuccess,
      message: isSuccess ? 'Payment successful' : 'Payment failed',
      orderId: vnpParams.vnp_TxnRef,
      amount: parseInt(vnpParams.vnp_Amount) / 100, // Convert from smallest unit back to VND
      transactionId: vnpParams.vnp_TransactionNo,
      bankCode: vnpParams.vnp_BankCode,
      payDate: vnpParams.vnp_PayDate,
      responseCode: vnpParams.vnp_ResponseCode,
      cardType: vnpParams.vnp_CardType,
    };
  },
};

// MoMo Payment Service
const momo = {
  // Create MoMo payment request
  createPaymentRequest: async (orderId, amount, orderInfo) => {
    try {
      const momoRequestBody = {
        partnerCode: paymentConfig.momo.partnerCode,
        accessKey: paymentConfig.momo.accessKey,
        requestId: `${Date.now()}_${orderId}`,
        amount: amount.toString(),
        orderId: `MOMO_${orderId}`,
        orderInfo: orderInfo || `Payment for order ${orderId}`,
        returnUrl: paymentConfig.momo.returnUrl,
        notifyUrl: paymentConfig.momo.notifyUrl,
        extraData: '', // Base64 encoded extra data if needed
        requestType: 'captureMoMoWallet',
      };
      
      // Create signature
      const rawSignature = Object.keys(momoRequestBody)
        .filter(key => key !== 'signature')
        .sort()
        .map(key => `${key}=${momoRequestBody[key]}`)
        .join('&');
      
      const signature = crypto
        .createHmac('sha256', paymentConfig.momo.secretKey)
        .update(rawSignature)
        .digest('hex');
      
      momoRequestBody.signature = signature;
      
      // Send request to MoMo
      const response = await axios.post(
        paymentConfig.momo.paymentUrl,
        momoRequestBody
      );
      
      return response.data;
    } catch (error) {
      console.error('MoMo payment error:', error);
      throw new Error('Failed to create MoMo payment');
    }
  },
  
  // Process MoMo IPN (Instant Payment Notification)
  processIpn: (ipnData) => {
    try {
      // Verify signature
      const rawSignature = Object.keys(ipnData)
        .filter(key => key !== 'signature')
        .sort()
        .map(key => `${key}=${ipnData[key]}`)
        .join('&');
      
      const signature = crypto
        .createHmac('sha256', paymentConfig.momo.secretKey)
        .update(rawSignature)
        .digest('hex');
      
      const isValidSignature = signature === ipnData.signature;
      
      if (!isValidSignature) {
        return {
          isSuccess: false,
          message: 'Invalid signature',
        };
      }
      
      // Check if payment is successful (0 = success)
      const isSuccess = ipnData.errorCode === '0';
      
      return {
        isSuccess,
        message: isSuccess ? 'Payment successful' : `Payment failed: ${ipnData.message}`,
        orderId: ipnData.orderId.replace('MOMO_', ''),
        amount: parseInt(ipnData.amount),
        transactionId: ipnData.transId,
        payType: ipnData.payType,
        responseDate: ipnData.responseTime,
      };
    } catch (error) {
      console.error('MoMo IPN processing error:', error);
      return {
        isSuccess: false,
        message: 'Failed to process MoMo IPN',
      };
    }
  },
};

// COD (Cash on Delivery) payment (simple implementation)
const cod = {
  createCodPayment: (orderId, amount) => {
    return {
      isSuccess: true,
      message: 'COD payment created',
      orderId,
      amount,
      paymentMethod: 'COD',
      paymentStatus: 'pending',
    };
  },
};

// Helper function to sort object by key
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  
  return sorted;
}

module.exports = {
  vnpay,
  momo,
  cod,
};
