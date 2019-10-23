// 还款管理
import http from '@/utils/http'
import apiPath from './path.config'

/**
 * 获取还款计划
 */
export function getRepaymentPlanList () {
  return http({
    url: apiPath['repaymentPlanList']()
  })
}

/**
 * 获取已还款明细
 */
export function getRepaymentDetailConfirm ({
  currentPage,
  uname,
  startTime,
  endTime
}) {
  return http({
    url: apiPath['repaymentDetailConfirm'](currentPage),
    query: {
      uname,
      startTime,
      endTime
    }
  })
}

/**
 * 获取待还款明细
 */
export function getRepaymentDetailUnconfirm ({
  uname,
  repaymentStartDate,
  repaymentEndDate
}) {
  return http({
    url: apiPath['repaymentDetailUnconfirm'](),
    query: {
      uname,
      repaymentStartDate,
      repaymentEndDate
    }
  })
}

/**
 * 还款明细-确认
 */
export function repaymentConfirm ({id, type, repaymentAmount, repaymentTime}) {
  return http({
    method: 'PUT',
    url: apiPath['repaymentConfirm'](),
    data: {id, type, repaymentAmount, repaymentTime}
  })
}
