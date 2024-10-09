import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardAPI = async (boardId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  )
  return response.data
}

export const createColumnAPI = async (columnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, columnData)
  return response.data
}

export const createCardAPI = async (cardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, cardData)
  return response.data
}
