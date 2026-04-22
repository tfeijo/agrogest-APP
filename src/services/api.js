import axios from 'axios';
import Constants from 'expo-constants';

const DEFAULT_API_URL = 'http://localhost:3001';

// Resolution order:
// 1. expo constants extra.apiUrl (configured in app.json / app.config.js)
// 2. EXPO_PUBLIC_API_URL env var (EAS / expo start inline)
// 3. DEFAULT_API_URL (used only in local dev so we fail fast in prod builds)
const resolveApiUrl = () => {
  const extra = Constants.manifest?.extra ?? Constants.expoConfig?.extra;
  if (extra && extra.apiUrl) return extra.apiUrl;
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;
  return DEFAULT_API_URL;
};

const api = axios.create({
  baseURL: resolveApiUrl(),
  timeout: 30000,
});

export default api;
