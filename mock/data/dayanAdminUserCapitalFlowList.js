module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'list': [{
        'flowId': 1233434320,
        'uid': 12,
        'userName': 'Adam',
        'flowAmount': 20000,
        'finFlag': '0',
        'businessLargeTypeCn': '申购',
        'createTime': '2019-02-20'
      }, {
        'flowId': 1233434321,
        'uid': 12,
        'userName': 'Adam',
        'flowAmount': 2000,
        'finFlag': '1',
        'businessLargeTypeCn': '赎回',
        'createTime': '2019-02-21'
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
