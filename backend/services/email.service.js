
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email templates
const templates = {
  orderConfirmation: (order, user) => {
    const items = order.orderItems.map(item => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${
          new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)
        }</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${
          new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)
        }</td>
      </tr>`
    ).join('');

    return {
      subject: `[Hera Tea] Order Confirmation #${order._id.toString().substr(-6)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 20px 0;">
            <h2 style="color: #5c9a8c;">Thank You for Your Order!</h2>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3>Order #${order._id.toString().substr(-6)}</h3>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3>Order Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: left;">Quantity</th>
                <th style="padding: 10px; text-align: left;">Price</th>
                <th style="padding: 10px; text-align: left;">Total</th>
              </tr>
              ${items}
            </table>
            
            <div style="margin-top: 20px; text-align: right;">
              <p><strong>Subtotal:</strong> ${
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.itemsPrice)
              }</p>
              <p><strong>Shipping:</strong> ${
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.shippingPrice)
              }</p>
              <p><strong>Tax:</strong> ${
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.taxPrice)
              }</p>
              <p style="font-size: 18px;"><strong>Total:</strong> ${
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)
              }</p>
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3>Shipping Address</h3>
            <p>
              ${order.shippingAddress.fullName}<br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}<br>
              ${order.shippingAddress.postalCode}<br>
              ${order.shippingAddress.phone}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777;">
            <p>If you have any questions, please contact our customer service.</p>
            <p>Thank you for shopping with Hera Tea!</p>
          </div>
        </div>
      `,
    };
  },
  
  orderStatusUpdate: (order, user) => {
    return {
      subject: `[Hera Tea] Order #${order._id.toString().substr(-6)} Status Updated`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 20px 0;">
            <h2 style="color: #5c9a8c;">Order Status Update</h2>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px;">
            <h3>Your Order #${order._id.toString().substr(-6)} has been updated</h3>
            <p><strong>New Status:</strong> ${order.status}</p>
            <p><strong>Updated on:</strong> ${new Date().toLocaleDateString()}</p>
            
            ${order.status === 'shipped' ? 
              `<p><strong>Tracking Information:</strong> ${order.trackingNumber || 'Not available yet'}</p>` : 
              ''
            }
            
            <p style="margin-top: 20px;">
              <a href="${process.env.FRONTEND_URL}/account/orders/${order._id}" 
                 style="background-color: #5c9a8c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
                View Order Details
              </a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777;">
            <p>If you have any questions, please contact our customer service.</p>
            <p>Thank you for shopping with Hera Tea!</p>
          </div>
        </div>
      `,
    };
  },
  
  welcomeEmail: (user) => {
    return {
      subject: 'Welcome to Hera Tea!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 20px 0;">
            <h2 style="color: #5c9a8c;">Welcome to Hera Tea!</h2>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>Hello ${user.name},</p>
            <p>Thank you for joining Hera Tea! We're excited to have you as part of our community.</p>
            <p>At Hera Tea, we're passionate about bringing you the finest selection of teas from around the world.</p>
          </div>
          
          ${user.isAffiliate ? 
            `<div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
              <h3>Your Affiliate Information</h3>
              <p><strong>Referral Code:</strong> ${user.referralCode}</p>
              <p>Share this code with your friends and earn commission on their purchases!</p>
            </div>` : 
            ''
          }
          
          <div style="margin-bottom: 20px;">
            <p>To get started:</p>
            <ol>
              <li>Browse our collection of premium teas</li>
              <li>Learn about the health benefits of different tea varieties</li>
              <li>Discover perfect brewing techniques</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}" 
               style="background-color: #5c9a8c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
              Start Shopping
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777;">
            <p>If you have any questions, please contact our customer service.</p>
            <p>Thank you for joining Hera Tea!</p>
          </div>
        </div>
      `,
    };
  },
  
  passwordReset: (user, resetToken) => {
    return {
      subject: 'Reset Your Hera Tea Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 20px 0;">
            <h2 style="color: #5c9a8c;">Password Reset</h2>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px;">
            <p>Hello ${user.name},</p>
            <p>You requested to reset your password. Please click the button below to set a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}" 
                 style="background-color: #5c9a8c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                Reset Password
              </a>
            </div>
            
            <p>If you didn't request this, please ignore this email or contact our support team.</p>
            <p>This link will expire in 1 hour.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777;">
            <p>If you have any questions, please contact our customer service.</p>
          </div>
        </div>
      `,
    };
  },
};

// Email sending functions
const emailService = {
  // Send order confirmation email
  sendOrderConfirmation: async (order, user) => {
    try {
      const template = templates.orderConfirmation(order, user);
      
      const mailOptions = {
        from: `"Hera Tea" <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: template.subject,
        html: template.html,
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      throw error;
    }
  },
  
  // Send order status update email
  sendOrderStatusUpdate: async (order, user) => {
    try {
      const template = templates.orderStatusUpdate(order, user);
      
      const mailOptions = {
        from: `"Hera Tea" <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: template.subject,
        html: template.html,
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Order status update email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending order status update email:', error);
      throw error;
    }
  },
  
  // Send welcome email to new users
  sendWelcomeEmail: async (user) => {
    try {
      const template = templates.welcomeEmail(user);
      
      const mailOptions = {
        from: `"Hera Tea" <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: template.subject,
        html: template.html,
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Welcome email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  },
  
  // Send password reset email
  sendPasswordResetEmail: async (user, resetToken) => {
    try {
      const template = templates.passwordReset(user, resetToken);
      
      const mailOptions = {
        from: `"Hera Tea" <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: template.subject,
        html: template.html,
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Password reset email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  },
  
  // Send custom email
  sendCustomEmail: async (to, subject, html) => {
    try {
      const mailOptions = {
        from: `"Hera Tea" <${process.env.EMAIL_FROM}>`,
        to,
        subject,
        html,
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Custom email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending custom email:', error);
      throw error;
    }
  },
};

module.exports = emailService;
