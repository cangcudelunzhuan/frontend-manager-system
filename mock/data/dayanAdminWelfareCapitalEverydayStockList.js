module.exports = function ({ req }) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'list': [{
        'eStockId': 1,
        'stockDate': '2019-03-20',
        'stockTotalAmount': 99999,
        'remittanceTotalAmount': 20000,
        'redeemTotalAmount': 20000
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
