
import api from './api';

const affiliateService = {
  // Get affiliate dashboard stats
  getAffiliateStats: async () => {
    try {
      const response = await api.get('/affiliate/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching affiliate stats:', error);
      throw error;
    }
  },

  // Get affiliate orders
  getAffiliateOrders: async () => {
    try {
      const response = await api.get('/affiliate/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching affiliate orders:', error);
      throw error;
    }
  },

  // Get withdrawal history
  getWithdrawalHistory: async () => {
    try {
      const response = await api.get('/affiliate/withdrawals');
      return response.data;
    } catch (error) {
      console.error('Error fetching withdrawal history:', error);
      throw error;
    }
  },

  // Request withdrawal
  requestWithdrawal: async (amount) => {
    try {
      const response = await api.post('/affiliate/withdraw', { amount });
      return response.data;
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      throw error;
    }
  },

  // Apply to become an affiliate
  applyForAffiliate: async () => {
    try {
      const response = await api.post('/affiliate/apply');
      return response.data;
    } catch (error) {
      console.error('Error applying for affiliate:', error);
      throw error;
    }
  }
};

export default affiliateService;
