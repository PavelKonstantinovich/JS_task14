const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};
