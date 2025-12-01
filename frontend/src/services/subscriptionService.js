import api from '../api/axios';

export const subscriptionService = {
  getCurrentSubscription: async () => {
    const response = await api.get('/subscriptions/current');
    return response.data;
  },

  getUsageSummary: async () => {
    const response = await api.get('/subscriptions/usage');
    return response.data;
  },

  cancelSubscription: async (cancelAtPeriodEnd = true) => {
    const response = await api.post('/subscriptions/cancel', {
      cancelAtPeriodEnd,
    });
    return response.data;
  },

  reactivateSubscription: async () => {
    const response = await api.post('/subscriptions/reactivate');
    return response.data;
  },

  createCheckoutSession: async (plan) => {
    const response = await api.post('/stripe/create-checkout-session', {
      plan,
    });
    return response.data;
  },
};

export default subscriptionService;

