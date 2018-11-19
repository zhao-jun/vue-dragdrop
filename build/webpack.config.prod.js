const path = require('path')
const basicConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const userConfig = require('../config')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader v15新增
const webpack = require('webpack')
const packageJson = require('../package.json')

const resolve = (dir) => path.join(__dirname, '..', dir)
const include = [resolve('test'), resolve('src')]
let config =  webpackMerge(basicConfig, {
  entry: userConfig.proEntry,
  output: {
    filename: 'index.js',
    library: packageJson.name,
    libraryTarget: 'umd',
    path: resolve('dist')
  },
  externals: {
    vue: 'vue',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 生产环境提取css
        use: [
          'vue-style-loader',
          //  MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   localIdentName: '[hash:base64:5]',
            //   camelCase: true // 驼峰
            // }
          },
          'postcss-loader',
          'less-loader'
        ],
        include
      }
    ]
  }
})

config.plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`
    }
  }),
  // new MiniCssExtractPlugin({
  //   filename: 'styles.[chunkhash:8].css'
  // })
]

module.exports = config
