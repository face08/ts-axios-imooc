export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/**
 * axios配置接口类型
 */
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  cancelToken?: CancelToken
  [propsName: string]: any
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AxiosBasicCredentials
  validateStatus?: (status: number) => boolean
  baseURL?: string
}

/**
 * axios响应接口类型
 */
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * Error接口
 */
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config?: AxiosRequestConfig): AxiosPromise<T>

  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): AxiosPromise<T>

  <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn<T = any> {
  (error: any): void
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

// 取消实例类型
export interface CancelToken {
  promise: Promise<Cancel>

  reason?: Cancel

  throwIfRequested(): void
}

// 取消方法接口定义
export interface Canceler {
  (message?: string): void
}

//CancelToken类构造函数参数的接口定义
export interface CancelExecutor {
  (cancel: Canceler): void
}

// source方法返回值类型
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// CancelTokenStatic静态类

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
