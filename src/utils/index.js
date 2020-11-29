import req from 'fetch/index.js'
import store from '../store/index.js'

/**
 * 通过递归实现结构化数据扁平化
 * @param {Array} data 需要扁平化的数组
 * @param {String} childName 递归的子节点名称
 */
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
 * @param {Number} time 定时器的延迟时间
 */
export const commDebounce = (fn, time) => {
  let timer = null

  return function (e) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

/**
 * 节流
 * @param {Function} fn 传入执行函数
 * @param {Number} time 定时器的延迟时间
 */
export const commThrottle = (fn, time) => {
  let canRun = true

  return function () {
    if (!canRun) {
      return
    }

    canRun = false

    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, time)
  }
}

/**
 * 对象数组排序
 * @param {Array} arr  传入排序对象数组
 * @param {string} propertyName  传入对象数组排序根据的key
 */
export const commSortArr = (arr, propertyName) => {
  let sortResult = arr.some(item => {
    return isNaN(Number(item[propertyName]))
  })

  // 如果存在Number转换不了的值(例如undefined, String类型的值),会使sort排序无效,那么抛出警告
  if (sortResult) {
    console.warn('排序失败!无法使用', propertyName, '字段排序,请检查数据中是否存在无法被转换为可运算类型的值')
  }

  let newArr = [...arr]

  newArr.sort((prev, next) => {
    return prev[propertyName] - next[propertyName]
  })

  return newArr
}

/**
 * excel文件导出
 * @param {String | Object} excelData excel文件数据
 * @param {String} excelName excel文件名称
 * @param {String} excelType excel文件类型
 */
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

/**
 * 银行存款格式数据转换(123456789.12 ---> 1,234,567.12)
 * @param {String | number} depositData 需要转换的数据
 */
export const commBankDepositFormat = function (depositData) {
  let str = typeof depositData === 'number' ? String(depositData) : depositData
  let spotIndex = str.indexOf('.')
  let depositArr = spotIndex > 0 ? str.slice(0, spotIndex).split('').reverse() : str.split('').reverse()
  let suffix = spotIndex > 0 ? str.slice(spotIndex) : ''
  let eachCount = Math.floor(depositArr.length / 3)
  let arrLength = depositArr.length

  for (let i = 1; i <= eachCount; i ++) {
    if (i * 3 < arrLength) {
      if (i > 1) {
        depositArr.splice((i * 3) + i - 1, 0, ',')
      } else {
        depositArr.splice(i * 3, 0, ',')
      }
    }
  }

  return depositArr.reverse().join('') + suffix
}