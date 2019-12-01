// 数据扁平化
export const dataFlattening = (data) => {
  let list = []

  data.forEach(item => {
    list.push(item)

    if (item.children && item.children.length) {
      list = list.concat(dataFlattening(item.children))
    }
  })

  return list
}
