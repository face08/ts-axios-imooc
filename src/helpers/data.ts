import { isPlainObject } from './util'

export function transformReuqest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
