module.exports = function ({ req }) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'list': [{
        'redeemId': 1,
        'redeemUid': 1,
        'redeemUphone': '182****9999',
        'redeemUname': 'CG',
        'redeemAmount': 10000,
        'redeemBankAccount': '637263782678',
        'redeemBankInfo': '银行卡信息',
        'remittanceStatus': '1',
        'createTime': '2019-03-20'
      }, {
        'redeemId': 2,
        'redeemUid': 1,
        'redeemUphone': '182****9999',
        'redeemUname': 'CG',
        'redeemAmount': 10000,
        'redeemBankAccount': '637263782678',
        'redeemBankInfo': '银行卡信息',
        'remittanceStatus': '2',
        'createTime': '2019-03-20'
      }, {
        'redeemId': 3,
        'redeemUid': 1,
        'redeemUphone': '182****9999',
        'redeemUname': 'CG',
        'redeemAmount': 10000,
        'redeemBankAccount': '637263782678',
        'redeemBankInfo': '银行卡信息',
        'remittanceStatus': '1',
        'createTime': '2019-03-20'
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
