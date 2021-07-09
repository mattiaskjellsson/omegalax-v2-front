import axios from 'axios';
import config from './config';

const transport = axios.create({
  baseURL: `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/`
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
  return result.data;
}

export const getData = async () => {
  console.log(`CONFIG API PROTOCOL: ${config.API_PROTOCOL}`)
  console.log(`CONFIG API HOST: ${config.API_HOST}`)
  console.log(`CONFIG API PORT: ${config.API_PORT}`)
  console.log(`-------------------------------`)
  console.log(`API PROTOCOL: ${process.env.REACT_APP_API_PROTOCOL}`)
  console.log(`API HOST: ${process.env.REACT_APP_API_HOST}`)
  console.log(`API PORT: ${process.env.REACT_APP_API_PORT}`)
  const result = await transport.get(`data`)
  return result.data;
}