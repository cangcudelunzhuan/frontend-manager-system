module.exports = function ({ req }) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'list': [{
        'remittanceId': 1,
        'remittanceUid': '汇款用户ID 0',
        'remittanceUname': '汇款用户名称 cg',
        'remittanceUphone': '18288889999',
        'remittanceAmount': 20000,
        'remittanceBankName': '杭州银行',
        'remittanceBankAccount': '635420986622124317',
        'remittanceBankBranch': '钱江支行',
        'bankSerialNo': '4214321324231',
        'remittanceTime': '2019-03-20',
        'createTime': '2019-02-21',
        'remarks': '备注备注'
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
