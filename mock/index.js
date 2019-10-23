const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http').Server(app)

app.use(express.static('static'))

app.use(bodyParser.json({
  type: 'application/json'
}))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())

// 解决跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token')
  res.set('Access-Control-Expose-Headers', 'token')
  if (req.method === 'OPTIONS') {
    res.json({ message: '这是个预检请求' })
  } else {
    next()
  }
})
app.use(function (req, res, next) {
  let reqPathArr = req.path.split('/')
  let reqApi = ''
  let reqMethod = req.method
  let reqQuery = req.query
  let reqBody = req.body

  let data = (reqMethod === 'POST' || reqMethod === 'PUT') ? reqBody : reqQuery
  let params = ''

  for (let i = 1; i < reqPathArr.length; i++) {
    let regStr = /^[A-z]|\++$/
    let regIncludeNum = /[0-9]+/
    let reqPathItem = reqPathArr[i]
    // 获取restful api中的params参数
    if (regIncludeNum.test(reqPathItem)) {
      params = reqPathItem
    }
    // 忽略restful api中的params参数
    if (regStr.test(reqPathItem)) {
      // console.log(reqPathArr)
      let firstLetterUpper = (i === 1) ? reqPathArr[i][0] : reqPathArr[i][0].toUpperCase()
      reqApi += (firstLetterUpper + reqPathArr[i].substring(1, reqPathArr[i].length))
    }
  }
  console.log(reqApi)
  setTimeout(() => {
    res.status(200).send(require('./data/' + reqApi)({
      method: reqMethod,
      data: data,
      params: params,
      req: req,
      res: res
    }))
    next()
  }, 200)
})

http.listen(3001, function () {
  console.log('mock server启动端口: 3001')
})
