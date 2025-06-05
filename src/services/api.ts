import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // <- así está bien: una ruta relativa
})

export default api
