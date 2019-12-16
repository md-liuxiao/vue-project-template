export default {
  methods: {
    /**
     * 使用form方式导出文件
     * @param {String} requestUrl 导出文件的路径
     * @param {Object} params 需要传递的参数
     */
    exportFile (requestUrl, params = {}) {
      let url = process.env.BASE_API + requestUrl

      let form = document.createElement('form')

      form.setAttribute('action', url)
      form.setAttribute('method', 'post')

      for (let key in params) {
        let input = document.createElement('input')

        input.setAttribute('type', 'text')
        input.setAttribute('name', key)
        input.setAttribute('value', params[key])

        form.appendChild(input)
      }

      document.body.appendChild(form)

      form.submit()

      document.body.removeChild(form)
    }
  }
}
