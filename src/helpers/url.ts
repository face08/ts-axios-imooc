import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') //空格 号转为 +
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  let serializedParams

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []

    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
    serializedParams = parts.join('&')
  })
  const markIndex = url.indexOf('#')

  if (serializedParams) {
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') > -1 ? '&  ' : '?') + serializedParams
  }
  return url
}

interface URLOrigin {
  protocol: string
  host: string
}

export function isURLSameOrigin(requestURL: string): boolean {
  debugger
  const { protocol, host } = resolveURL(requestURL)
  return protocol === currentOrigin.protocol && host === currentOrigin.host
}

const urlParseNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParseNode.setAttribute('href', url)
  const { protocol, host } = urlParseNode
  return {
    protocol,
    host
  }
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
