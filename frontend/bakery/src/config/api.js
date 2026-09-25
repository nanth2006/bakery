// Centralized API Base URL configuration for Sweet Store
// When deployed (e.g. Vercel/Netlify), set VITE_API_URL in your deployment environment variables.
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export default API_BASE_URL;
