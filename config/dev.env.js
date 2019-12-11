'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  BASE_API: '"http://localhost:3000"'
  // BASE_API: '"https://mr-test.bgyfw.com:8114/MR"'
})
