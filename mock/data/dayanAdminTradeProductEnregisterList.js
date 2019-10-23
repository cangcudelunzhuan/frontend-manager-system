module.exports = function ({
  req
}) {
  let token = req.headers.token
  return {
    code: token ? '000000' : '900001',
    data: token ? [{
      createTime: '2019-03-11 20:16:10',
      enregisterAmount: '10000.00',
      enregisterId: '1105079967429066754',
      enregisterRate: '4.0',
      enregisterShare: '1',
      enregisterShareUpdateCount: '0',
      productId: '10001',
      productName: '洛社一号合伙份额转让001C',
      status: '1',
      togetheSuperpositionRate: '0.5',
      togetherId: '1105067735374790659',
      uid: '1105063575019880450',
      userNameShow: 'Adam',
      userPhoneShow: '187****8040'
    }, {
      createTime: '2019-03-11 20:16:10',
      enregisterAmount: '10000.00',
      enregisterId: '1105079967429066755',
      enregisterRate: '4.0',
      enregisterShare: '1',
      enregisterShareUpdateCount: '0',
      productId: '10001',
      productName: '洛社一号合伙份额转让001C',
      status: '2',
      togetheSuperpositionRate: '0.5',
      togetherId: '1105067735374790659',
      uid: '1105063575019880450',
      userNameShow: 'Adam',
      userPhoneShow: '187****8040'
    }, {
      createTime: '2019-03-11 20:16:10',
      enregisterAmount: '10000.00',
      enregisterId: '1105079967429066756',
      enregisterRate: '4.0',
      enregisterShare: '1',
      enregisterShareUpdateCount: '0',
      productId: '10001',
      productName: '洛社一号合伙份额转让001C',
      status: '3',
      togetheSuperpositionRate: '0.5',
      togetherId: '1105067735374790659',
      uid: '1105063575019880450',
      userNameShow: 'Adam',
      userPhoneShow: '187****8040'
    }] : null,
    total: 50,
    pageSize: 10,
    current: 1,
    message: token ? '' : '请重新登录！',
    sysMark: ''
  }
}
