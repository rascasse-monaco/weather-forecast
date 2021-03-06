module.exports = {
  context: __dirname + '/app',
  entry: './entry',
  target: 'node',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'bundle.js'
  },
  mode: 'production',//'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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