module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? [{
      'repaymentAmount': 20000,
      'repaymentTime': '2019-03-20'
    }, {
      'repaymentAmount': 26000,
      'repaymentTime': '2019-04-30'
    }] : null,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
