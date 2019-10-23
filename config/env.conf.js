const ENV_BUILD_TYPE = process.env.ENV_BUILD_TYPE || 'dev'

const PROD_ASSETS_PATH_MAP = {
  dev: 'http://192.168.45.191/dyAdmin/',
  test: 'http://192.168.100.142/dyAdmin/',
  pre:'http://pre.49capital.cn/dyAdmin/',
  online:'https://www.49capital.cn/dyAdmin/'
}

const PROD_API_PATH_MAP = {
  dev: "http://192.168.45.191/api/dayan",
  test: "http://192.168.100.142/api/dayan",
  pre:'http://pre.49capital.cn/api/dayan',
  online: "https://www.49capital.cn/api/dayan"
}

const PROD_PRODDETAIL_PATH_MAP = {
  dev: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8686f44488f83d93&redirect_uri=http://pre.49capital.cn/wechat/attention/",
  test: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8686f44488f83d93&redirect_uri=http://pre.49capital.cn/wechat/attention/",
  pre: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8686f44488f83d93&redirect_uri=http://pre.49capital.cn/wechat/attention/",
  online: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdf50cd5e82972a34&redirect_uri=https://www.49capital.cn/wechat/attention/"
}

module.exports = {
  PROD_ASSETS_PATH: PROD_ASSETS_PATH_MAP[ENV_BUILD_TYPE],
  PROD_API_PATH: PROD_API_PATH_MAP[ENV_BUILD_TYPE],
  PROD_PRODDETAIL_PATH: PROD_PRODDETAIL_PATH_MAP[ENV_BUILD_TYPE]
}
