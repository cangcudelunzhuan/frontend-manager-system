import http from '@/utils/http'
import apiPath from './path.config'

// 产品详情
export function productDetail (params) {
  return http({
    url: apiPath['productDetail'](params.productId)
  })
}

// 发布产品
export function productCreate (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['productCreate'](),
    method: 'POST',
    data: params
  })
}
// 修改产品
export function productUpdate (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['productUpdate'](),
    method: 'PUT',
    data: params
  })
}

// 审核
export function productOpe (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['productOpe'](),
    method: 'PUT',
    data: params
  })
}

// 产品列表
export function productList (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['productList'](params.current || 1),
    query: params
  })
}

// 提交的产品列表
export function productSubmitList (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['productSubmitList'](params.current || 1),
    query: params
  })
}

// 审核产品列表
export function productAuditList (params) {
  console.log('>>' + JSON.stringify(params))
  return http({
    url: apiPath['productAuditList'](params.current || 1),
    query: params
  })
}

// 项目列表
export function projectAllList () {
  return http({
    url: apiPath['projectAllList']()
  })
}

// 下架
export function productDown (params) {
  return http({
    url: apiPath['productDown'](params.id),
    method: 'PUT'
  })
}

// 上架
export function productUp (params) {
  return http({
    url: apiPath['productUp'](params.id),
    method: 'PUT'
  })
}
