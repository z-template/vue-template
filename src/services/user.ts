import request from '@/utils/request'

export function getUserInfo() {
  return request('/api/userinfo')
}
