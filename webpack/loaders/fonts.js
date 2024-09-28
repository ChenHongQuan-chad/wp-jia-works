/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容
const path = require('path')

module.exports = {
    test: /\.(woff|woff2|eot|ttf)$/,
    use: {
        loader: 'file-loader',
        options: {
            name: 'fonts/[name].[ext]'
        }
    }
}
