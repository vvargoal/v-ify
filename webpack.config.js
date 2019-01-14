const path = require('path');

module.exports = {
  // mode: 'production',
  entry: './app/js/main.jsx',
  output: {
    path: path.join(__dirname, '/app/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'app/js'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
