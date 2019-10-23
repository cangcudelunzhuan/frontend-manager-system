module.exports = function ({ req }) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: '',
    message: '',
    sysMark: ''
  }
}
