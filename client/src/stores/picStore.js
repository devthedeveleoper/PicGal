import { create } from 'zustand';
import api from '../api';

const usePicStore = create((set) => ({
  pics: [],
  isLoading: false,

  fetchPics: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/pics');
      set({ pics: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch pics:", error);
      set({ isLoading: false });
    }
  },

  uploadPic: async (formData) => {
    // This will throw an error on failure, which the component can catch
    const response = await api.post('/pics/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // Add the new pic to the start of the array
    set((state) => ({ pics: [response.data, ...state.pics] }));
  },
}));

export default usePicStore;