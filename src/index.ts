import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { buildUrl } from './helpers/url'
import { transformReuqest } from './helpers/data'
import { processHeaders } from './helpers/header'
import { transformResponse } from './helpers/data'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformReuqestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformReuqestData(config: AxiosRequestConfig): any {
  return transformReuqest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(data, headers)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
