import axios from 'axios';

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
  const result = await transport.get(`data`)
  return result.data;
}