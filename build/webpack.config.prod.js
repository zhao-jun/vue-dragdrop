const path = require('path')
const basicConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolve = (dir) => path.join(__dirname, '..', dir)
const include = [resolve('test'), resolve('src')]
let config =  webpackMerge(basicConfig, {
  // entry: {
  //   app: resolve('vue/index.js'),
  //   // vender: ['vue']
  // },
  output: {
    // 打包的时候使用chunkhash，hash所有打包文件hash值相同，其中一个文件改变就全部改变，不利于缓存
    filename: '[name].[chunkhash:8].js',
    // 引用路径，node端/nginx做处理
    publicPath: '/public/',
    // path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 生产环境提取css
        use: [
           MiniCssExtractPlugin.loader,
          // 原来vue-loader css-module配置移到这
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]',
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
  // 把manifest提取出来，避免模块
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    // new ExtractTextWebpackPlugin('styles.[hash:8].css')
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash:8].css'
    })
  ]
})

module.exports = config
