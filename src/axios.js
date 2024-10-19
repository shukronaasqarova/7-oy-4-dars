import axios from 'axios'; // 'axios' ni qavs ichida yozish kerak

export const http = axios.create({
  baseURL: 'https://strapi-store-server.onrender.com/api/' // 'baseURL' to'g'ri yozilishi kerak
});
