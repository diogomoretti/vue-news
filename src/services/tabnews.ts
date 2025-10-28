import axios from 'axios'

const BASE_URL: string = '/api/v1/contents'

export const tabnewsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default tabnewsApi
