module.exports = function ({ req }) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'uid': 12,
      'name': '王三三',
      'headLogoUrl': 'https://placehold.it/100x100',
      'nameShow': '王先生',
      'bankAccount': '7839278932137',
      'dueOriginalAmount': 120000,
      'sex': '1',
      'phoneShow': '182****7777',
      'birthday': '1993-01-01',
      'identityType': '1',
      'identityNumShow': '428645199301018888',
      'identityTermValidity': '2020-01-01',
      'riskLevel': '1',
      'isRealName': '1',
      'downChannelId': 111,
      'registerChannelId': 111,
      'invitationUid': 111,
      'createTime': '2019-01-20'
    } : null,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
