const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/main.js'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './static/js')
  },
  plugins: [
    new ESLintPlugin({
      cache: true,
      exclude: 'node_modules',
      formatter: require.resolve('eslint-formatter-pretty'),
      eslintPath: require.resolve('eslint'),
      resolvePluginsRelativeTo: __dirname,
      ignore: true,
      useEslintrc: true
    }),
    new CleanWebpackPlugin()
  ]
};
