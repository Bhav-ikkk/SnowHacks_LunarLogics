import axios from 'axios'

/**
 * Axios Configuration
 * Centralized axios instance with default configuration
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - Add auth tokens, etc.
axiosInstance.interceptors.request.use(
  config => {
    // You can add auth tokens here
    // const token = getAuthToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.data)
      
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized - Please login')
          // Redirect to login or refresh token
          break
        case 403:
          console.error('Forbidden - Insufficient permissions')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Server error - Please try again later')
          break
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received:', error.request)
    } else {
      // Error in request setup
      console.error('Request setup error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance
