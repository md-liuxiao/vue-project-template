'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  // BASE_API: '"http://10.187.30.153:8080"'
  BASE_API: '"https://mr-test.bgyfw.com:8114/MR"'
})
