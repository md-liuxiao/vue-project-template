import axios from 'axios'
import {throwErr} from './throwErr.js'
import store from '../store/index.js'

const qs = require('qs')

const req = function (url, method, params, requestHeader, fileConfig = {}) {
  let instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 60000
  })

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error)
  })

  let requestConfig = {
    url: url,
    method: method,
    params: params,
    data: qs.stringify(params),
    headers: {},
    responseType: fileConfig.type === 'file' ? 'blob' : ''
  }

  let getReg = /get|GET/
  let postReg = /post|POST/

  let fileData = {}

  let timer = null

  if (fileConfig.type === 'file') {
    fileData = {
      fileId: new Date().getTime(),
      fileName: fileConfig.fileName,
      fileLoadTime: 0,
      fileStatus: 'downloading',
      errorInfo: '',
      fileUrl: null
    }

    store.commit('changeExportFileList', fileData)

    timer = setInterval(() => {
      fileData.fileLoadTime += 1
      store.commit('changeExportFileList', fileData)
    }, 1000)
  }

  if (getReg.test(requestConfig.method)) {
    delete requestConfig.data
    requestConfig.headers['Content-Type'] = 'application/json'
  } else if (postReg.test(requestConfig.method)) {
    delete requestConfig.params
    requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  // 添加响应拦截器
  instance.interceptors.response.use(response => {
    clearInterval(timer)
    timer = null

    if (response.status === 200) {
      if (fileConfig.type === 'file') {
        fileData.fileStatus = 'success'
        fileData.fileUrl = window.URL.createObjectURL(new Blob([response]))
        store.commit('changeExportFileList', fileData)
      }

      return response.data
    } else {
      if (fileConfig.type === 'file') {
        fileData.fileStatus = 'error'
        store.commit('changeExportFileList', fileData)
      }

      throw new Error(throwErr(response))
    }
  }, error => {
    clearInterval(timer)
    timer = null

    if (fileConfig.type === 'file') {
      fileData.fileStatus = 'error'
      store.commit('changeExportFileList', fileData)
    }

    return Promise.reject(error)
  })

  return instance(requestConfig)
}

export default req
