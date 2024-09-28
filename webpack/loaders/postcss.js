const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  test: /\.css$/,
  use:[MiniCssExtractPlugin.loader, { loader: 'css-loader'},'postcss-loader']
  ,
//   use: ExtractTextPlugin.extract({
//     fallback: 'style-loader',
//     use: [{ loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
//   }),
};
