import { ofetch } from 'ofetch'

const request = ofetch.create({
  baseURL: '',
  headers: {
    // Accept: 'application/json',
    // 'aaaa': '99999'
  },
  timeout: 10000,
  credentials: 'include',
  onResponse: ({ response }) => {
    if (response.status === 200) return response._data
  }
})
export default request
