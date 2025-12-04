import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  console.log('📤 Request:', config.method?.toUpperCase(), config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error);

    if (error.code === 'ERR_NETWORK') {
      alert('⚠️ 无法连接后端服务\n\n请确认：\n1. 后端已启动\n2. 无 CORS 阻止\n3. Docker 正常运行');
    } else if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        alert('❌ 请求参数错误');
      } else if (status === 404) {
        alert('🔍 资源未找到');
      } else if (status >= 500) {
        alert('💥 服务器内部错误，请稍后再试');
      } else {
        alert(`❌ 错误 ${status}: ${error.response.data.detail || '未知错误'}`);
      }
    } else {
      alert('❌ 未知网络错误');
    }

    return Promise.reject(error);
  }
);

export default apiClient;