module.exports = function ({ req }) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      productId: 1,
      name: 'xxxxxx',
      shortName: 'xx',
      projectId: 11,
      projectName: 'ax',
      productType: '2',
      totalShare: 1000,
      shareUnitPrice: 2222,
      lockPeriod: 20,
      survivalPeriod: 11,
      baseRate: 0.45,
      protocolRate: 0.8,
      settlementCycle: 20,
      techniqueGrade: 'BBB',
      riskLevel: '较高风险',
      productExplain: 'sdsdsdsdsdsd',
      enregisterMinPurchaseShare: 20,
      enregisterMaxPurchaseShare: 24,
      isSupportAutoSurvival: '1',
      isSupportTogethe: '2',
      togetherRate: 1112,
      maxTogetheNum: 23,
      togetheSuperpositionRate: 23.4,
      spreadType: '2',
      auditLogVoList: [
        {
          createTime: '1555062026',
          publishUname: 'xiaogege',
          auditUname: 'dagege',
          auditResult: '2',
          reason: 'sdsdsdsdsxx'
        },
        {
          createTime: '1555062026',
          publishUname: 'xiaogege',
          auditUname: 'dagege',
          auditResult: '1',
          reason: 'sdsdsdsdsxx'
        }
      ]
    } : null,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
