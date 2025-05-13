
const axios = require('axios');
const crypto = require('crypto');

// Configuration
const config = {
  appKey: process.env.LAZADA_APP_KEY,
  appSecret: process.env.LAZADA_APP_SECRET,
  apiUrl: process.env.LAZADA_API_URL || 'https://api.lazada.vn/rest',
  redirectUrl: process.env.LAZADA_REDIRECT_URL,
  region: process.env.LAZADA_REGION || 'VIETNAM',
};

// Generate signature for Lazada API
const generateSignature = (apiPath, params = {}) => {
  // Sort parameters by key
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});
  
  // Create string to sign
  const concatenatedString = Object.keys(sortedParams)
    .map(key => `${key}${sortedParams[key]}`)
    .join('');
  
  const signString = `${apiPath}${concatenatedString}`;
  
  // Create HMAC hexdigest
  const signature = crypto
    .createHmac('sha256', config.appSecret)
    .update(signString)
    .digest('hex')
    .toUpperCase();
  
  return signature;
};

// Create Axios instance for Lazada API
const lazadaClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
});

// Process Lazada API response
const processResponse = (response) => {
  const { data } = response;
  
  if (data.code !== '0') {
    throw new Error(`Lazada API Error: ${data.code} - ${data.message}`);
  }
  
  return data;
};

// Lazada API methods
const lazadaService = {
  // Auth - Get authorization URL
  getAuthUrl: () => {
    const url = `https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${encodeURIComponent(config.redirectUrl)}&client_id=${config.appKey}`;
    return url;
  },
  
  // Auth - Get access token
  getAccessToken: async (code) => {
    try {
      const apiPath = '/auth/token/create';
      
      const params = {
        app_key: config.appKey,
        code,
        timestamp: Date.now().toString(),
      };
      
      params.sign = generateSignature(apiPath, params);
      
      const response = await lazadaClient.post(apiPath, null, {
        params,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Lazada access token:', error);
      throw error;
    }
  },
  
  // Auth - Refresh access token
  refreshAccessToken: async (refreshToken) => {
    try {
      const apiPath = '/auth/token/refresh';
      
      const params = {
        app_key: config.appKey,
        refresh_token: refreshToken,
        timestamp: Date.now().toString(),
      };
      
      params.sign = generateSignature(apiPath, params);
      
      const response = await lazadaClient.post(apiPath, null, {
        params,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error('Error refreshing Lazada access token:', error);
      throw error;
    }
  },
  
  // Orders - Get orders
  getOrders: async (accessToken, params = {}) => {
    try {
      const apiPath = '/orders/get';
      
      const defaultParams = {
        app_key: config.appKey,
        access_token: accessToken,
        timestamp: Date.now().toString(),
        created_after: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        sort_direction: 'DESC',
        offset: 0,
        limit: 10,
      };
      
      const requestParams = {
        ...defaultParams,
        ...params,
      };
      
      requestParams.sign = generateSignature(apiPath, requestParams);
      
      const response = await lazadaClient.get(apiPath, {
        params: requestParams,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Lazada orders:', error);
      throw error;
    }
  },
  
  // Orders - Get order items
  getOrderItems: async (accessToken, orderId) => {
    try {
      const apiPath = '/order/items/get';
      
      const params = {
        app_key: config.appKey,
        access_token: accessToken,
        timestamp: Date.now().toString(),
        order_id: orderId,
      };
      
      params.sign = generateSignature(apiPath, params);
      
      const response = await lazadaClient.get(apiPath, {
        params,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Lazada order items:', error);
      throw error;
    }
  },
  
  // Products - Get products
  getProducts: async (accessToken, params = {}) => {
    try {
      const apiPath = '/products/get';
      
      const defaultParams = {
        app_key: config.appKey,
        access_token: accessToken,
        timestamp: Date.now().toString(),
        offset: 0,
        limit: 10,
        filter: 'live',
      };
      
      const requestParams = {
        ...defaultParams,
        ...params,
      };
      
      requestParams.sign = generateSignature(apiPath, requestParams);
      
      const response = await lazadaClient.get(apiPath, {
        params: requestParams,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error('Error getting Lazada products:', error);
      throw error;
    }
  },
  
  // Products - Create product
  createProduct: async (accessToken, product) => {
    try {
      const apiPath = '/product/create';
      
      // Map your product to Lazada's format
      const lazadaProduct = {
        Request: {
          Product: {
            PrimaryCategory: 10000632, // You need to map to Lazada category
            SPUId: '',
            AssociatedSku: '',
            Attributes: {
              name: product.name,
              description: product.description,
              short_description: product.description.substring(0, 100),
              brand: 'Hera Tea', // Your brand name
              model: product.name,
              warranty_type: 'No Warranty',
              material: 'Other',
            },
            Skus: {
              Sku: [
                {
                  SellerSku: product._id, // Your product ID
                  price: product.price,
                  quantity: product.stock,
                  package_width: '10',
                  package_height: '10',
                  package_length: '10',
                  package_weight: product.weight || '0.5',
                  package_content: product.name,
                  Images: {
                    Image: [product.image],
                  },
                },
              ],
            },
          },
        },
      };
      
      const xml = require('js2xmlparser').parse('Request', lazadaProduct);
      
      const params = {
        app_key: config.appKey,
        access_token: accessToken,
        timestamp: Date.now().toString(),
        payload: xml,
      };
      
      params.sign = generateSignature(apiPath, params);
      
      const response = await lazadaClient.post(apiPath, null, {
        params,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error('Error creating Lazada product:', error);
      throw error;
    }
  },
  
  // Import orders from Lazada to your system
  importOrdersFromLazada: async (accessToken) => {
    try {
      // Get recent Lazada orders
      const ordersResponse = await lazadaService.getOrders(accessToken, {
        created_after: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        limit: 50,
      });
      
      if (!ordersResponse.data || !ordersResponse.data.orders) {
        return { success: true, message: 'No new orders found', orders: [] };
      }
      
      const lazadaOrders = ordersResponse.data.orders;
      
      // Get details for each order
      const detailedOrders = [];
      for (const order of lazadaOrders) {
        const orderItems = await lazadaService.getOrderItems(accessToken, order.order_id);
        detailedOrders.push({
          ...order,
          items: orderItems.data,
        });
      }
      
      return {
        success: true,
        message: `Imported ${detailedOrders.length} orders from Lazada`,
        orders: detailedOrders,
      };
    } catch (error) {
      console.error('Error importing orders from Lazada:', error);
      throw error;
    }
  },
  
  // Update Lazada order status
  updateOrderStatus: async (accessToken, orderId, status) => {
    try {
      let apiPath;
      const params = {
        app_key: config.appKey,
        access_token: accessToken,
        timestamp: Date.now().toString(),
        order_id: orderId,
      };
      
      // Map internal status to Lazada API endpoints
      switch (status) {
        case 'ready_to_ship':
          apiPath = '/order/rts';
          break;
        case 'delivered':
          apiPath = '/order/sof';
          params.delivery_type = 'dropship';
          break;
        case 'cancelled':
          apiPath = '/order/cancel';
          params.reason = 'Out of stock';
          break;
        default:
          throw new Error(`Unsupported status: ${status}`);
      }
      
      params.sign = generateSignature(apiPath, params);
      
      const response = await lazadaClient.post(apiPath, null, {
        params,
      });
      
      return processResponse(response);
    } catch (error) {
      console.error(`Error updating Lazada order status to ${status}:`, error);
      throw error;
    }
  },
};

module.exports = lazadaService;
