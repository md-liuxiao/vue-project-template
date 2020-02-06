import req from 'fetch/index.js'
import store from '../store/index.js'

// 数据扁平化
/**
 * 通过递归实现结构化数据扁平化
 * @param {Array} data 需要扁平化的数组
 * @param {String} childName 递归的子节点名称
 */
export const dataFlattening = (data, childName = 'children') => {
  let list = []

  data.forEach(item => {
    list.push(item)

    if (item[childName] && item[childName].length) {
      list = list.concat(dataFlattening(item[childName], childName))
    }
  })

  return list
}

/**
 * 全局方法，传入字典名称，获取对应字典列表
 * @param {String} dictName 字典名
 */
export const dictFormat = (dictName) => {
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

export const debounce = (fn) => {
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
export const throttle = (fn) => {
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
