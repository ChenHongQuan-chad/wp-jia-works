/*
 * @Description:
 * @Author: chad-Chen
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    test: /\.(css|less)$/,
    use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader' },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [require('autoprefixer')]
                }
            }
        },
        'less-loader'
    ]
    //   use: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: [{ loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
    //   }),
}
