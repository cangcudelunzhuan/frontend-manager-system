module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? [{
      orderId: 1,
      userName: 'Adam',
      phoneShow: '182****9888',
      productId: 123456,
      productName: '产品A',
      enregisterShare: 10,
      enregisterAmount: 10000,
      togetherSuperpositionRate: 49.9,
      lockPeriod: 2,
      survivalPeriod: 2,
      historyRate: 50.2,
      income: 2000,
      createTime: '2019-04-10'
    }] : null,
    total: 50,
    pageSize: 10,
    current: 1,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
