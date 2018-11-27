const path = require('path')
const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  proEntry: resolve('src/index'),
  docsEntry: resolve('src/main')
}
