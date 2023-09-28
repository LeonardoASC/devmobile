import axios from 'axios';

const token = window.localStorage.getItem('token')

const api = axios.create({
  baseURL: 'http://10.55.0.101:8000/api/',
  // timeout: 1000,
  headers:{
    'Authorization':`Bearer ${token}`,
    'Content-Type': 'Application/json',
    'Accept':'Application/json'
  }
})

export default api