export default {
  methods: {
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
