import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://quantigo.test/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('quantigo.auth_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const sanctumClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://quantigo.test',
  withCredentials: true,
  withXSRFToken: true,
})
