const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',

  // 웹팩 빌드시 어디에 어떻게 출력물을 만들지 설정
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  // output: {
  //   filename: 'iife.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   library: 'imageMinify', // 모듈을 내보낼 전역변수 이름
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
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};