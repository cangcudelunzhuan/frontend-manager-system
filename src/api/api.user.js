// 用户管理
import http from '@/utils/http'
import apiPath from './path.config'

/**
 * 获取验证码
 */
export function getVcode (phone) {
  return http({ url: apiPath['loginVcode'](phone) })
}

/**
 * 登录
 */
export function login ({ phone, vcode }) {
  return http({
    method: 'POST',
    url: apiPath['login'](),
    data: { phone, vcode }
  })
}

/**
 * 获取用户列表
 */
export function getUserList ({
  currentPage = 1,
  registerStartDate,
  registerEndDate,
  phoneOrBankAccount,
  userName,
  isRealName
}) {
  return http({
    url: apiPath['userList'](currentPage),
    query: {
      registerStartDate,
      registerEndDate,
      phoneOrBankAccount,
      userName,
      isRealName
    }
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo (uid) {
  return http({ url: apiPath['userInfo'](uid) })
}

/**
 * 获取资金流水列表
 */
export function getCapitalFlowList ({
  uid,
  currentPage = 1,
  flowStartTime,
  flowEndTime,
  businessLargeType
}) {
  return http({
    url: apiPath['capitalFlowList']({ uid, currentPage }),
    query: {
      flowStartTime,
      flowEndTime,
      businessLargeType
    }
  })
}
