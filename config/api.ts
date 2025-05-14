// Базова URL-адреса API
// Для Expo на реальному пристрої використовуйте вашу локальну IP-адресу
// Для веб-версії або емулятора можна використовувати localhost
export const API_BASE_URL = 'http://localhost:8000'; // Замініть на вашу IP-адресу
export const API_URL = API_BASE_URL; // For socket.io connection

// Окремі ендпоінти API
export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/api/v1`,
  users: `${API_BASE_URL}/api/v1/users`,
  sessions: `${API_BASE_URL}/api/v1/sessions`,
  materials: `${API_BASE_URL}/api/v1/materials`,
}; 