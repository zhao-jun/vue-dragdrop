const path = require('path')
const webpack = require('webpack')
const basicConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'

// // css module开发和生产命名区分
// const localIdentName = isDev
// ? '[path][name]-[local]-[hash:base64:5]'
// : '[hash:base64:5]'

const resolve = (dir) => path.join(__dirname, '..', dir)
const include = [resolve('test'), resolve('src')]
module.exports = webpackMerge(basicConfig, {
  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    basicConfig.entry
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          // 原来vue-loader css-module配置移到这
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]-[local]-[hash:base64:5]',
              camelCase: true // 驼峰
            }
          },
          'postcss-loader',
          'less-loader'
        ],
        include
      }
    ]
  },
  plugins: [
    // webpack-dev-server hot
    new webpack.HotModuleReplacementPlugin(),
  ]
})
