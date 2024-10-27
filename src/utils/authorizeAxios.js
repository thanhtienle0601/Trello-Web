import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'

// Khỏi tạo một đối tượng Axios (authorizeAxiosInstance) mục đích để custom và cấu hình chung cho dự án.
let authorizeAxiosInstance = axios.create()

// Thời gian chờ tối đa của 1 request: tối đa 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials: Sẽ cho phép axios tự động gửi cookie lên BE trong mỗi request
authorizeAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    interceptorLoadingElements(false)

    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
