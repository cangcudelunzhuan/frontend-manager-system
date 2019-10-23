module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? [{
      'manageTeamId': 11,
      'manageTeamName': '大衍金融'
    }, {
      'manageTeamId': 12,
      'manageTeamName': '江苏银行'
    }, {
      'manageTeamId': 13,
      'manageTeamName': '杭州银行'
    }] : null,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
