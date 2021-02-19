const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  // output: {
  //   filename: 'iife.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   library: 'nicedb',
  //   libraryExport: 'default'
  // },
  // output: {
  //   filename: 'test.js',
  //   path: path.resolve(__dirname, 'test'),
  //   library: 'nicedb',
  //   libraryExport: 'default'
  // },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  }
};