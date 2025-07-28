import { create } from 'zustand';
import api from '../api';

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start true to check auth on app load

  checkAuthStatus: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/auth/status');
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
  
  login: async (email, password) => {
    // This will throw an error on failure, which the component can catch
    const response = await api.post('/auth/login', { email, password });
    set({ user: response.data, isAuthenticated: true });
  },

  logout: async () => {
    await api.post('/auth/logout');
    set({ user: null, isAuthenticated: false });
  },
}));

export default useUserStore;