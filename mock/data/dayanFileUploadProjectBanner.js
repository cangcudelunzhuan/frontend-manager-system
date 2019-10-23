module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? 'https://placehold.it/600x300' : '',
    message: '',
    sysMark: ''
  }
}
