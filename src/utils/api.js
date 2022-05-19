import { message } from 'antd'
import axios from 'axios'
import { local } from 'src/utils/storage'

const methods = ['get', 'head', 'post', 'put', 'delete', 'options', 'patch']
const paramsMethods = ['get', 'delete']

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] =
  'PUT, GET, POST, DELETE, OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'

class Api {
  constructor() {
    methods.forEach(
      (method) =>
        (this[method] = (path, data = {}, headers = {}) =>
          new Promise((resolve, reject) => {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                ...headers,
              },
              auth: {
                username: local.getItem('username'),
                password: local.getItem('password'),
              },
            }
            data =
              paramsMethods.indexOf(method) !== -1
                ? { params: data, ...config }
                : data

            this.doFetch(
              method,
              process.env.REACT_APP_API_ROOT + path,
              data,
              config,
              resolve,
              reject
            )
          }))
    )
  }

  // 发起请求
  doFetch(method, path, data, config, resolve, reject) {
    axios[method](path, data, config)
      .then((result) => {
        const { data, status } = result
        if ([1, 200].includes(data.status)) {
          resolve(data.data)
        }
        // 这里后端是资源没有权限需要登录统一返回401
        else if ([401].includes(data.status)) {
          reject(data)
          goToLogin()
        }
        // serviceCode无效返回404, 其他错误返回0
        else if ([0, 404].includes(data.status)) {
          reject(data)
          message.error(data.msg)
        } else if (status === 200 || status === 201) {
          resolve(data)
        } else {
          if (data.msg) {
            message.error(data.msg)
          }
          reject(data)
        }
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            reject(data)
            goToLogin()
          } else if (error.response.status >= 500) {
            reject({
              message: `Server error [${error.response.status}]`,
            })
          } else {
            message.error(error.response.data.message)
            reject(error.response.data)
          }
        } else {
          reject(error)
        }
      })
  }
}

export default new Api()

export function goToLogin() {
  window.location.href = `${window.location.origin}${window.location.pathname}#/login`
}
