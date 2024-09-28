/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容
module.exports = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }
}
