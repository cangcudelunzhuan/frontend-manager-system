module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'list': [{
        'repaymentTime': '2019-02-20',
        'productName': '产品A',
        'bankInfo': '银行信息',
        'uid': '1231321321',
        'uname': '用户A',
        'redeemAmount': 20000,
        'income': 40000,
        'redeemPenaltyAmount': 4000,
        'repaymentAmount': 64000
      }, {
        'repaymentTime': '2019-02-20',
        'productName': '产品B',
        'bankInfo': '银行信息',
        'uid': '1231321321',
        'uname': '用户A',
        'redeemAmount': 80000,
        'income': 40000,
        'redeemPenaltyAmount': 6000,
        'repaymentAmount': 86000
      }],
      'pagination': {
        'total': 50,
        'pageSize': 10,
        'current': 0
      }
    } : null,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
