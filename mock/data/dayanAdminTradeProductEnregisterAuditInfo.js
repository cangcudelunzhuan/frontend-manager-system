module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? {
      bankAccount: '6227001541200218761',
      bankBranch: '中国建设银行股份有限公司杭州经济技术开发区支行营业部',
      enregisterAmount: '10000.00',
      identityNum: '330724199210270524',
      name: 'Adam',
      phone: '18768198040'
    } : null,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
