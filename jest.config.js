const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  verbose: true,
  setupFiles: ['<rootDir>/jest/setupTests.js'],
  testMatch: ['<rootDir>/**/__tests__/?(*.)(spec|test).{js,jsx,mjs}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/example/'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileMock.js',
    '\\.(css|less)$': '<rootDir>/jest/styleMock.js'
  },
  collectCoverage: true,
  coverageDirectory: './coverage'
}
