module.exports = function ({ req }) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? [{
      'uid': 0,
      'name': '用户姓名 0',
      'sex': '1',
      'phoneShow': '手机号码 0',
      'bankNo': '银行卡号 0',
      'holdingAssets': 0,
      'accumulatedIncome': 0,
      'isRealName': '1',
      'createTime': '注册日期'
    }] : null,
    total: 50,
    pageSize: 10,
    current: 1,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
