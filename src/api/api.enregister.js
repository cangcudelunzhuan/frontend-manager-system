// 登记相关
import http from '@/utils/http'
import apiPath from './path.config'

/**
 * 获取登记信息列表
 */
export function getEnregisterList ({
  currentPage = 1,
  userName,
  phone,
  enregisterStartDate,
  enregisterEndDate
}) {
  return http({
    url: apiPath['enregisterList'](currentPage),
    query: {
      userName,
      phone,
      enregisterStartDate,
      enregisterEndDate
    }
  })
}

// 登记信息详情
export function getEnregisterInfo (enregisterId) {
  return http({ url: apiPath['enregisterInfo'](enregisterId) })
}

// 登记信息审核
export function submitEnregisterResult ({
  enregisterId,
  resultStatus,
  remarks
}) {
  return http({
    method: 'POST',
    url: apiPath['enregisterOpe'](),
    data: {
      enregisterId,
      resultStatus,
      remarks
    }
  })
}

/**
 * 获取申购成功列表
 */
export function getSubscribeSuccessList ({
  currentPage = 1,
  userName,
  phone,
  productName,
  subscribeStartDate,
  subscribeEndDate
}) {
  return http({
    url: apiPath['subscribeSuccessList'](currentPage),
    query: {
      userName,
      phone,
      productName,
      subscribeStartDate,
      subscribeEndDate
    }
  })
}
