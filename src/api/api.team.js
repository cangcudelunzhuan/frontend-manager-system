import http from '@/utils/http'
import apiPath from './path.config'

// 团队列表
export function teamList (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['teamList'](params.current || 1)
  })
}

// 团队详情
export function teamDetail (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['teamDetail'](params.id)
  })
}

// logo上传
export function teamlogoUp (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['teamlogoUp'](params),
    method: 'POST',
    data: params
  })
}

// 团队新增
export function teamCreate (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['teamCreate'](params),
    method: 'POST',
    data: params
  })
}

// 团队修改
export function teamUpdate (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['teamUpdate'](params),
    method: 'PUT',
    data: params
  })
}
