module.exports = function ({
  method,
  data,
  params,
  res
}) {
  res.set('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI5IiwiaXNzIjoiZGF5YW4iLCJuYW1lIjoi5ZKM5p6XIiwiZXhwIjoxNTU0Njg1NzYxLCJfIjoxNTU0NTEyOTYxMjk0fQ.OQs7EjfRFz9pTEPPUsDScV2MCEJjkuqP4Bfi8dyC_dI')
  return {
    code: '000000',
    data: '',
    message: ''
  }
}
