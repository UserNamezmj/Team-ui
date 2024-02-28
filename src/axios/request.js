import axios from 'axios'
import { showFailToast } from 'vant';
// 创建实例时配置默认值
const isDev = process.env.NODE_ENV === 'development';
const request = axios.create({
  baseURL: '/api',
  // baseURL: isDev? 'http://localhost:8080/api' : 'http//122.124.54.146/api',
  timeout: 100000,
});

// 创建实例后修改默认值
// request.defaults.headers.common['Authorization'] = AUTH_TOKEN;
request.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
request.defaults.withCredentials = true

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data && response.data.code !== 2000) {
    showFailToast(response.data.message)
  }
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request;