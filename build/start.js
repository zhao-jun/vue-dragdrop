const webpack = require('webpack');
const path = require('path')
const chalk = require('chalk')
const { formatWebpackMessages, clearConsole, opn } = require('./utils')
const webpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.config.dev')

const resolve = (dir) => path.join(__dirname, '..', dir)
const PORT = parseInt(process.env.PORT, 10) || 8000;
// 是否在文本终端
const isInteractive = process.stdout.isTTY;

// "Compiler" is a low-level interface to Webpack.
// It lets us listen to some events and provide our own custom messages.
let compiler;
try {
  compiler = webpack(webpackDevConfig);
} catch (err) {
  console.log(chalk.red('Failed to compile.'));
  console.log();
  console.log(err.message || err);
  console.log();
  process.exit(1);
}

// webpack-dev-server config
let serverConfig = {
  // port: 8000,
  host: '0.0.0.0',
  overlay: {
    // 在浏览器页面上显示编译错误，默认false
    errors: true
  },
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  // 404，前端路由
  historyApiFallback: {
    index: '/public/index.html',
    disableDotRule: true
  },
  // Enable gzip compression of generated files.
  compress: true,
  // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
  // Note that we only recommend to use `public` folder as an escape hatch
  // for files like `favicon.ico`, `manifest.json`, and libraries that are
  // for some reason broken when imported through Webpack.
  // 根目录
  contentBase: resolve('public'),
  watchContentBase: true,
  // 静态文件资源引用路径，和webpack.config.base.js文件里面output的publicPath一样
  publicPath: '/public/',
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebookincubator/create-react-app/issues/293
  watchOptions: {
    ignored: /node_modules/,
  },
  // 不输出任何内容，包括错误和警告，默认false
  quiet: true,
  // 此处使用opn无效
  // open: true,
  proxy: {
    '/api': 'http://127.0.0.1:3030'
  }
}

const url = 'http://localhost:' + PORT
const devServer = new webpackDevServer(compiler, serverConfig);
devServer.listen(PORT, '127.0.0.1', err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting the development server...\n'));
  opn(url);
});

// Compiler Hooks https://webpack.js.org/api/compiler-hooks/
compiler.plugin('done', stats => {
  if (isInteractive) {
    clearConsole();
  }
  const messages = formatWebpackMessages(stats.toJson({}, true));
  const isSuccessful = !messages.errors.length && !messages.warnings.length;
  if (isSuccessful) {
    console.log(chalk.green('Compiled successfully!'));
  }
  if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(chalk.red('Failed to compile.\n'));
      console.log(messages.errors.join('\n\n'));
      return;
  }
  if (messages.warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(messages.warnings.join('\n\n'));
    console.log(
      '\nTo ignore, add ' +
        chalk.cyan('// eslint-disable-next-line') +
        ' to the line before.\n'
    );
  }
  return compiler;
})

// "invalid" event fires when you have changed a file, and Webpack is
// recompiling a bundle. WebpackDevServer takes care to pause serving the
// bundle, so if you refresh, it'll wait instead of serving the old one.
// "invalid" is short for "bundle invalidated", it doesn't imply any errors.
compiler.plugin('invalid', () => {
  if (isInteractive) {
    clearConsole();
  }
  console.log('Compiling...');
});
