module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'projectId': 222,
      'name': '项目A',
      'location': '浙江杭州',
      'raiseAmount': 200000,
      'manageTeamId': 11,
      'manageTeamName': '大衍金融',
      'manageTeamLogoUrl': 'https://placehold.it/40x40',
      'manageTeamIntroduce': '管理团队介绍...',
      'projectIntroduce': '项目介绍...',
      'guaranteeIntroduce': '担保介绍...',
      'bannerImgUrl': 'https://placehold.it/200x80',
      'relatedMediaInfo': '百度|谷歌',
      'relatedMediaUrl': 'https://www.baidu.com|https://www.google.com',
      'auditLogVoList': [{
        'auditId': 1,
        'createTime': '2019-04-17',
        'publishUname': '提交人Adam',
        'auditUname': '审核人Jack',
        'auditResult': '2', // 1 审核通过， 2审核不通过
        'reason': '备注写下'
      }, {
        'auditId': 2,
        'createTime': '2019-04-17',
        'publishUname': '提交人Adam',
        'auditUname': '审核人Jason',
        'auditResult': '1',
        'reason': ''
      }]
    } : null,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
