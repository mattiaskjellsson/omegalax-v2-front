import axios from 'axios';
import config from './config';

const transport = axios.create({
  baseURL: `${config.API_PROTOCOL}://${config.API_HOST}:${config.API_PORT}/`,
})

export const getAllLimits = async () => {
  const result = await transport.get(`limits`)
  return result.data
}

export const getLimits = async (id) => {
  const result = await transport.get(`limits/${id}`)
  return result.data
}

export const putLimits = async (data) => {
  const result = await transport.put(`limits`, data)
  return result.data
}

export const getData = async () => {
  const result = await transport.get(`data`)
  return result.data
}

export const getHistory = async (poolId) => {
  const result = await transport.get(`data/history/${poolId}/`)
  return result.data
}

export const login = async (password) => {
  const result = await transport.post(`login`,{username: '', password})
  return result.data
}