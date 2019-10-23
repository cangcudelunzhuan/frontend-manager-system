import axios from 'axios'
import router from '@/router/index'
import { getStorage, removeStorage } from '@/utils/storage'
import { message as $message } from 'ant-design-vue'

export default function ({ url, method, headers, query, data }) {
  let _method = method || 'get'
  let _url = url
  let _headers = headers || {}
  let _query = query || {}
  let _data = data || {}
  getStorage('token') && (_headers.token = getStorage('token'))
  return new Promise((resolve, reject) => {
    axios({
      method: _method.toLowerCase(),
      headers: _headers,
      url: _url,
      data: _data,
      params: _query
    }).then(res => {
      let code = res.data.code
      if (code === '000000') {
        let data = {}
        if (res.data && res.data.pageSize) {
          data.list = res.data.data || []
          data.pagination = {
            current: res.data.current - 0,
            pageSize: res.data.pageSize - 0,
            total: res.data.total - 0
          }
        } else {
          data = res.data.data
        }
        resolve({
          data: data,
          headers: res.headers
        })
      } else if (code === '900001') {
        $message.error('请重新登录')
        removeStorage('token')
        router.push({ name: 'login' })
      } else {
        $message.error(res.data.message)
        reject(res.data)
      }
    }).catch(err => {
      reject(err.response.data)
    })
  })
}
