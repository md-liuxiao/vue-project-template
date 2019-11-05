import axios from 'axios'

const req = function (url, method, params, requestHeader) {
  let instance = axios.create({
    baseURL: 'https://www.baidu.com',
    timeout: 60000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return instance
}

export default req
