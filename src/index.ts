import { AxiosRequestConfig } from './types'
import { buildUrl } from './helpers/url'
import { transformReuqest } from './helpers/data'
import { processHeaders } from './helpers/header'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
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
