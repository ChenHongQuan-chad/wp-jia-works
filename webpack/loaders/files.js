/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

const matchArr = __dirname.match(/\\wp-content\\themes\\([^/]+)\\webpack\\loaders$/g)
const themeName = matchArr[0].replace('\\wp-content\\themes\\', '').replace('\\webpack\\loaders', '')
module.exports = {
    test: /\.(png|jpg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8192, // size <= 8KB
                name: 'img/[name].[ext]', // 属于file-loader的属性
                publicPath: `/wp-content/themes/${themeName}/dist` // 属于file-loader的属性 TODO 会因为添加前缀而无效
            }
        }
    ]
}
