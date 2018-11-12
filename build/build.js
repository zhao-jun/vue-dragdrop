
const ora = require('ora');
const rm = require('rimraf');
const webpack = require('webpack')
const chalk = require('chalk')
const paths = require('./paths')
const webpackConfig = require('./webpack.config.prod')

const spinner = ora('生产环境打包中...').start();

rm(paths.dist, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(chalk.cyan('  打包完成.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
