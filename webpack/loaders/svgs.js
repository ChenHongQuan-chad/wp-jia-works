/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

module.exports = {
    test: /\.svg$/,
    use: [
        {
            loader: 'vue-svg-loader',
            options: {
                name: 'img/[name].[ext]'
            }
        }
    ]
}
