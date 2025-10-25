import axios from 'axios';

// Set this to your API origin in dev.
const baseURL =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:5000';

export const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true
});

// Optional: tiny helper to normalize errors
export function getAxiosErrorMessage(err) {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message;
  }
  return String(err);
}
