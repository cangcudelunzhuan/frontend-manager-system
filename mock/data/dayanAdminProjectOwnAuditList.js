module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      'list': [{
        'projectId': 1233434320,
        'name': '智慧惠山',
        'location': '无锡市惠山区',
        'raiseAmount': 20000,
        'manageTeamName': '大衍金融',
        'auditTime': '2019-02-20',
        'createTime': '2019-02-20',
        'status': 1, // 1待上架，2上架，3下架
        'auditResult': 1 // 1审核中 2 审核驳回 3通过
      }, {
        'projectId': 1233434321,
        'name': '天猫项目',
        'location': '杭州市西湖区',
        'raiseAmount': 20000,
        'manageTeamName': '大衍金融',
        'auditTime': '2019-02-20',
        'createTime': '2019-02-20',
        'status': 2, // 1待上架，2上架，3下架
        'auditResult': 3 // 1审核中 2 审核驳回 3通过
      }, {
        'projectId': 1233434322,
        'name': '天猫项目',
        'location': '杭州市西湖区',
        'raiseAmount': 20000,
        'manageTeamName': '大衍金融',
        'auditTime': '2019-02-20',
        'createTime': '2019-02-20',
        'status': 3, // 1待上架，2上架，3下架
        'auditResult': 3 // 1审核中 2 审核驳回 3通过
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
