import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// AI Service API calls
export const aiAPI = {
  // Get AI content suggestions
  getSuggestions: async (type, context = '') => {
    try {
      const response = await axios.post(`${API_BASE}/ai/suggestions`, {
        type,
        context
      });
      return response.data;
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      throw error;
    }
  },

  // Analyze ATS compatibility
  analyzeATS: async (resumeData, jobDescription) => {
    try {
      const response = await axios.post(`${API_BASE}/ai/ats/analyze`, {
        resumeData,
        jobDescription
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing ATS:', error);
      throw error;
    }
  }
};

export default aiAPI;
