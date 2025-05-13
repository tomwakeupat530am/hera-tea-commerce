
// This is a simple SMS service implementation
// Replace with actual SMS provider SDK/API when needed

// Configuration for SMS providers
const config = {
  provider: process.env.SMS_PROVIDER || 'mock', // 'mock', 'twilio', 'vonage', etc.
  // Twilio config
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  // Vonage/Nexmo config
  vonage: {
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    from: process.env.VONAGE_FROM_NUMBER,
  },
};

// Initialize SMS clients based on provider
let twilioClient;
let vonageClient;

if (config.provider === 'twilio') {
  // Lazy load twilio if used
  const twilio = require('twilio');
  twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
} else if (config.provider === 'vonage') {
  // Lazy load vonage if used
  const { Vonage } = require('@vonage/server-sdk');
  vonageClient = new Vonage({
    apiKey: config.vonage.apiKey,
    apiSecret: config.vonage.apiSecret,
  });
}

// SMS templates
const templates = {
  orderConfirmation: (order) => {
    return `[Hera Tea] Cảm ơn bạn đã đặt hàng. Đơn hàng #${order._id.toString().substr(-6)} đang được xử lý. Tổng giá trị: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}.`;
  },
  
  orderStatusUpdate: (order) => {
    const statusMap = {
      processing: 'đang được xử lý',
      shipped: 'đã được giao cho đơn vị vận chuyển',
      delivered: 'đã được giao thành công',
      cancelled: 'đã bị huỷ',
    };
    
    const statusText = statusMap[order.status] || order.status;
    
    return `[Hera Tea] Đơn hàng #${order._id.toString().substr(-6)} ${statusText}. Xem chi tiết tại ${process.env.FRONTEND_URL}/account/orders`;
  },
  
  otpVerification: (otp) => {
    return `[Hera Tea] Mã xác thực của bạn là: ${otp}. Mã có hiệu lực trong 15 phút. Không chia sẻ mã này với người khác.`;
  },
};

// SMS sending functions for different providers
const smsProviders = {
  // Mock provider for development
  mock: {
    sendSMS: async (to, message) => {
      console.log(`MOCK SMS to ${to}: ${message}`);
      return {
        success: true,
        provider: 'mock',
        to,
        messageLength: message.length,
      };
    },
  },
  
  // Twilio provider
  twilio: {
    sendSMS: async (to, message) => {
      try {
        const formattedPhone = formatPhoneNumber(to);
        const result = await twilioClient.messages.create({
          body: message,
          from: config.twilio.phoneNumber,
          to: formattedPhone,
        });
        
        return {
          success: true,
          provider: 'twilio',
          messageId: result.sid,
          status: result.status,
        };
      } catch (error) {
        console.error('Twilio SMS error:', error);
        throw error;
      }
    },
  },
  
  // Vonage/Nexmo provider
  vonage: {
    sendSMS: async (to, message) => {
      try {
        const formattedPhone = formatPhoneNumber(to);
        
        return new Promise((resolve, reject) => {
          vonageClient.message.sendSms(
            config.vonage.from,
            formattedPhone,
            message,
            (error, responseData) => {
              if (error) {
                console.error('Vonage SMS error:', error);
                reject(error);
              } else {
                const { messages } = responseData;
                const response = {
                  success: messages[0].status === '0',
                  provider: 'vonage',
                  messageId: messages[0]['message-id'],
                  status: messages[0].status,
                };
                resolve(response);
              }
            }
          );
        });
      } catch (error) {
        console.error('Vonage SMS error:', error);
        throw error;
      }
    },
  },
};

// Helper function to format phone numbers
function formatPhoneNumber(phone) {
  // Remove spaces, dashes, etc.
  let cleaned = phone.replace(/\s+/g, '');
  
  // Make sure the phone number starts with country code
  if (!cleaned.startsWith('+')) {
    // Assume Vietnam if no country code
    cleaned = `+84${cleaned.startsWith('0') ? cleaned.substring(1) : cleaned}`;
  }
  
  return cleaned;
}

// Main SMS service
const smsService = {
  // Send order confirmation SMS
  sendOrderConfirmation: async (order, phone) => {
    try {
      const message = templates.orderConfirmation(order);
      const provider = smsProviders[config.provider];
      
      if (!provider) {
        throw new Error(`SMS provider "${config.provider}" not configured`);
      }
      
      return await provider.sendSMS(phone, message);
    } catch (error) {
      console.error('Error sending order confirmation SMS:', error);
      throw error;
    }
  },
  
  // Send order status update SMS
  sendOrderStatusUpdate: async (order, phone) => {
    try {
      const message = templates.orderStatusUpdate(order);
      const provider = smsProviders[config.provider];
      
      if (!provider) {
        throw new Error(`SMS provider "${config.provider}" not configured`);
      }
      
      return await provider.sendSMS(phone, message);
    } catch (error) {
      console.error('Error sending order status update SMS:', error);
      throw error;
    }
  },
  
  // Send OTP verification code
  sendOtpVerification: async (phone, otp) => {
    try {
      const message = templates.otpVerification(otp);
      const provider = smsProviders[config.provider];
      
      if (!provider) {
        throw new Error(`SMS provider "${config.provider}" not configured`);
      }
      
      return await provider.sendSMS(phone, message);
    } catch (error) {
      console.error('Error sending OTP verification SMS:', error);
      throw error;
    }
  },
  
  // Send custom SMS
  sendCustomSMS: async (phone, message) => {
    try {
      const provider = smsProviders[config.provider];
      
      if (!provider) {
        throw new Error(`SMS provider "${config.provider}" not configured`);
      }
      
      return await provider.sendSMS(phone, message);
    } catch (error) {
      console.error('Error sending custom SMS:', error);
      throw error;
    }
  },
};

module.exports = smsService;
