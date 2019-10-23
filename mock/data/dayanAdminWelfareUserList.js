module.exports = function ({ req }) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'list': [{
        'uid': 1,
        'name': '用户AAA',
        'phone': '18258887777',
        'sex': '1',
        'isRealName': '1',
        'holdTotalAmount': 20000,
        'yesterdayIncomeAmount': 5,
        'accumulatedIncomeAmount': 200,
        'bankAccount': '4214321324231',
        'bankInfo': '银行信息',
        'status': '1',
        'createTime': '2019-03-20'
      }, {
        'uid': 2,
        'name': '用户B',
        'phone': '18258887778',
        'sex': '2',
        'isRealName': '2',
        'holdTotalAmount': 20000,
        'yesterdayIncomeAmount': 5,
        'accumulatedIncomeAmount': 200,
        'bankAccount': '4214321324231',
        'bankInfo': '银行信息',
        'status': '2',
        'createTime': '2019-03-20'
      }, {
        'uid': 3,
        'name': '用户C',
        'phone': '18258887779',
        'sex': '3',
        'isRealName': '2',
        'holdTotalAmount': 20000,
        'yesterdayIncomeAmount': 5,
        'accumulatedIncomeAmount': 200,
        'bankAccount': '4214321324231',
        'bankInfo': '银行信息',
        'status': '2',
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
