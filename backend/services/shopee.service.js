
const axios = require('axios');
const crypto = require('crypto');

// Configuration
const config = {
  partnerId: process.env.SHOPEE_PARTNER_ID,
  partnerKey: process.env.SHOPEE_PARTNER_KEY,
  shopId: process.env.SHOPEE_SHOP_ID,
  apiUrl: process.env.SHOPEE_API_URL || 'https://partner.shopeemobile.com/api/v2',
  redirectUrl: process.env.SHOPEE_REDIRECT_URL,
};

// Generate authentication parameters
const generateAuthParams = (path) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const baseString = `${config.partnerId}${path}${timestamp}`;
  const sign = crypto
    .createHmac('sha256', config.partnerKey)
    .update(baseString)
    .digest('hex');
  
  return {
    partner_id: config.partnerId,
    timestamp,
    sign,
  };
};

// Create Axios instance for Shopee API
const shopeeClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Extract response data and handle errors
const processResponse = (response) => {
  const { data } = response;
  
  if (data.error) {
    throw new Error(`Shopee API Error: ${data.error} - ${data.message}`);
  }
  
  return data.response;
};

// Shopee API methods
const shopeeService = {
  // Auth - Get authentication URL
  getAuthUrl: () => {
    const path = '/auth/token/get';
    const timestamp = Math.floor(Date.now() / 1000);
    const baseString = `${config.partnerId}${path}${timestamp}`;
    const sign = crypto
      .createHmac('sha256', config.partnerKey)
      .update(baseString)
      .digest('hex');
    
    const url = `${config.apiUrl}${path}?partner_id=${config.partnerId}&timestamp=${timestamp}&sign=${sign}&redirect=${config.redirectUrl}`;
    
    return url;
  },
  
  // Auth - Get access token
  getAccessToken: async (code) => {
    try {
      const path = '/auth/token/get';
      const authParams = generateAuthParams(path);
      
      const response = await shopeeClient.post(path, {
        code,
        shop_id: parseInt(config.shopId),
        ...authParams,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Shopee access token:', error);
      throw error;
    }
  },
  
  // Auth - Refresh access token
  refreshAccessToken: async (refreshToken) => {
    try {
      const path = '/auth/access_token/get';
      const authParams = generateAuthParams(path);
      
      const response = await shopeeClient.post(path, {
        refresh_token: refreshToken,
        shop_id: parseInt(config.shopId),
        ...authParams,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error('Error refreshing Shopee access token:', error);
      throw error;
    }
  },
  
  // Orders - Get order list
  getOrders: async (accessToken, params = {}) => {
    try {
      const path = '/order/get_order_list';
      const authParams = generateAuthParams(path);
      
      const defaultParams = {
        time_range_field: 'create_time',
        time_from: Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000), // 7 days ago
        time_to: Math.floor(Date.now() / 1000),
        page_size: 10,
        cursor: '',
        order_status: 'READY_TO_SHIP',
      };
      
      const response = await shopeeClient.post(
        path,
        {
          ...defaultParams,
          ...params,
          shop_id: parseInt(config.shopId),
          ...authParams,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Shopee orders:', error);
      throw error;
    }
  },
  
  // Orders - Get order details
  getOrderDetails: async (accessToken, orderSn) => {
    try {
      const path = '/order/get_order_detail';
      const authParams = generateAuthParams(path);
      
      const response = await shopeeClient.post(
        path,
        {
          order_sn_list: Array.isArray(orderSn) ? orderSn : [orderSn],
          shop_id: parseInt(config.shopId),
          ...authParams,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Shopee order details:', error);
      throw error;
    }
  },
  
  // Products - Get product list
  getProducts: async (accessToken, params = {}) => {
    try {
      const path = '/product/get_item_list';
      const authParams = generateAuthParams(path);
      
      const defaultParams = {
        offset: 0,
        page_size: 10,
        item_status: 'NORMAL',
      };
      
      const response = await shopeeClient.post(
        path,
        {
          ...defaultParams,
          ...params,
          shop_id: parseInt(config.shopId),
          ...authParams,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Shopee products:', error);
      throw error;
    }
  },
  
  // Products - Get product details
  getProductDetails: async (accessToken, itemIds) => {
    try {
      const path = '/product/get_item_base_info';
      const authParams = generateAuthParams(path);
      
      const response = await shopeeClient.post(
        path,
        {
          item_id_list: Array.isArray(itemIds) ? itemIds : [itemIds],
          shop_id: parseInt(config.shopId),
          ...authParams,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Shopee product details:', error);
      throw error;
    }
  },
  
  // Sync a product to Shopee
  syncProductToShopee: async (accessToken, product) => {
    try {
      const path = '/product/add_item';
      const authParams = generateAuthParams(path);
      
      // Map your product to Shopee's format
      const shopeeProduct = {
        original_price: product.price,
        description: product.description,
        weight: parseFloat(product.weight),
        item_name: product.name,
        normal_stock: product.stock,
        logistic_info: [
          {
            enabled: true,
            logistic_id: 80791, // This depends on Shopee logistics options
            shipping_fee: 0, // Free shipping or set value
            size_id: 1, // Depends on Shopee size tier
          }
        ],
        category_id: 100636, // This depends on Shopee category mapping
        image: {
          image_id_list: [], // You'll need to upload images first
        },
        attribute_list: [],
        // Add other required fields
      };
      
      const response = await shopeeClient.post(
        path,
        {
          item: shopeeProduct,
          shop_id: parseInt(config.shopId),
          ...authParams,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      return processResponse(response);
    } catch (error) {
      console.error('Error syncing product to Shopee:', error);
      throw error;
    }
  },
  
  // Import orders from Shopee to your system
  importOrdersFromShopee: async (accessToken) => {
    try {
      // Get recent Shopee orders
      const ordersResponse = await shopeeService.getOrders(accessToken, {
        time_range_field: 'create_time',
        time_from: Math.floor((Date.now() - 1 * 24 * 60 * 60 * 1000) / 1000), // 1 day ago
        time_to: Math.floor(Date.now() / 1000),
        page_size: 50,
        order_status: 'READY_TO_SHIP',
      });
      
      const { order_list } = ordersResponse;
      if (!order_list || order_list.length === 0) {
        return { success: true, message: 'No new orders found', orders: [] };
      }
      
      // Get order details
      const orderSnList = order_list.map(order => order.order_sn);
      const orderDetails = await shopeeService.getOrderDetails(accessToken, orderSnList);
      
      // Process and return the orders
      return {
        success: true,
        message: `Imported ${orderDetails.order_list.length} orders from Shopee`,
        orders: orderDetails.order_list,
      };
    } catch (error) {
      console.error('Error importing orders from Shopee:', error);
      throw error;
    }
  },
};

module.exports = shopeeService;
