import req from 'fetch/index.js'
import store from '../store/index.js'

/**
 * 通过递归实现结构化数据扁平化
 * @param {Array} data 需要扁平化的数组
 * @param {String} childName 递归的子节点名称
 */
/* eslint-disable */
export const commDataFlattening = (data, childName = 'children') => {
  let list = []

  data.forEach(item => {
    list.push(item)

    if (item[childName] && item[childName].length) {
      list = list.concat(commDataFlattening(item[childName], childName))
    }
  })

  return list
}

/**
 * 全局方法，传入字典名称，获取对应字典列表
 * @param {String} dictName 字典名
 */
/* eslint-disable */
export const commDictFormat = (dictName) => {
  /* eslint-disable */
  if (Boolean(store.state.dictDatas[dictName])) {
    return new Promise(resolve => {
      resolve(store.state.dictDatas[dictName])
    })
  } else {
    let url = '/dicts/' + dictName
    return req(url, 'get')
  }
}

/**
 * 防抖
 * @param {Function} fn 传入执行函数
 */
/* eslint-disable */
export const commDebounce = (fn) => {
  let timer = null

  return function (e) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, 500)
  }
}

/**
 * 节流
 * @param {Function} fn 传入执行函数
 */
/* eslint-disable */
export const commThrottle = (fn) => {
  let canRun = true

  return function () {
    if (!canRun) {
      return
    }

    canRun = false

    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, 500)
  }
}

/**
 * 对象数组排序
 * @param {Array} arr  传入排序对象数组
 * @param {string} propertyName  传入对象数组排序根据的key
 */
/* eslint-disable */
export const commSortArr = (arr, propertyName) => {
  let newArr = [...arr]

  newArr.sort((prev, next) => {
    return prev[propertyName] - next[propertyName]
  })

  return newArr
}

/**
 * 
 * @param {String | Object} excelData excel文件数据
 * @param {String} excelName excel文件名称
 * @param {String} excelType excel文件类型
 */
/* eslint-disable */
export const commExportExcel = (excelData, excelName, excelType = 'xls') => {
  let url = null
  let link = document.createElement('a')

  if (typeof excelData === 'string') {
    url = window.URL.createObjectURL(new Blob([excelData]))
  }

  if (typeof excelData === 'object') {
    url = window.URL.createObjectURL(excelData)
  }

  link.href = url
  link.style.display = 'none'
  link.setAttribute('download', excelName + '.' + excelType)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
