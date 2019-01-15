const path = require('path');

module.exports = {
  // mode: 'production',
  entry: './js/main.jsx',
  output: {
    path: path.join(__dirname, '/app/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'js'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
