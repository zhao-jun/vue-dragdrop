const path = require('path');

const resolve = (dir) => path.join(__dirname, '..', dir)

// 多处使用路径移到此处
module.exports = {
  // appPublic: resolve('public')
  buildHtml: resolve('public/template.html'),
  dist: resolve('dist')
}
