import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/header'
import { transformReuqest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json,text/plain, */*'
    }
  },

  // 默认请求转化器配置
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformReuqest(data)
    }
  ],

  // 响应默认转化器配置
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  }
}

const methodsWithoutData = ['get', 'delete', 'head', 'options']

methodsWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
