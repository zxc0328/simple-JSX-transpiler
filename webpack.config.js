const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
  	library: "sjt",
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist'),
    filename: 'simple-jsx-transpiler.js'
  }
};