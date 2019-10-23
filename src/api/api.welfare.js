// 福利（工资宝）相关
import http from '@/utils/http'
import apiPath from './path.config'

/**
 * 获取用户列表
 */
export function getWelfareUserList ({
  currentPage = 1,
  name,
  phone,
  status
}) {
  return http({
    url: apiPath['welfareUserList'](currentPage),
    query: {
      name,
      phone,
      status
    }
  })
}

/**
 * 获取汇款（申购）列表
 */
export function getWelfareRemittanceList ({
  currentPage = 1,
  declareStartTime,
  declareEndTime,
  name,
  phone
}) {
  return http({
    url: apiPath['welfareRemittanceList'](currentPage),
    query: {
      declareStartTime,
      declareEndTime,
      name,
      phone
    }
  })
}

/**
 * 获取赎回列表
 */
export function getWelfareRedeemList ({
  currentPage = 1,
  redeemStartTime,
  redeemEndTime,
  name,
  phone,
  remittanceStatus
}) {
  return http({
    url: apiPath['welfareRedeemList'](currentPage),
    query: {
      redeemStartTime,
      redeemEndTime,
      name,
      phone,
      remittanceStatus
    }
  })
}

/**
 * 赎回标签为已转账
 */
export function welfareRedeemConfirm ({ redeemId }) {
  return http({
    url: apiPath['welfareRedeemConfirm'](redeemId),
    method: 'PUT'
  })
}

/**
 * 获取资金存量列表
 */
export function getWelfareCapitalStockList ({
  currentPage = 1,
  stockStartDate,
  stockEndDate
}) {
  return http({
    url: apiPath['welfareCapitalStockList'](currentPage),
    query: {
      stockStartDate,
      stockEndDate
    }
  })
}

/**
 * 获取资金流水列表
 */
export function getWelfareCapitalFlowList ({
  uid,
  currentPage = 1,
  flowStartTime,
  flowEndTime,
  businessLargeType
}) {
  return http({
    url: apiPath['welfareCapitalFlowList']({ uid, currentPage }),
    query: {
      flowStartTime,
      flowEndTime,
      businessLargeType
    }
  })
}

/**
 * 获取资金流水列表
 */
export function importWelfareRemittance (file) {
  return http({
    method: 'POST',
    url: apiPath['welfareRemittanceImport'](),
    data: file
  })
}
