const { override, fixBabelImports } = require('customize-cra')

module.exports = override(
  fixBabelImports('babel-plugin-import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)
