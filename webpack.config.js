const path = require('path');

module.exports = {
  entry: './src/script.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
module: {
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
    },
  ],
},
watch: true,
watchOptions: {
  ignored: /node_modules/,
}
};
