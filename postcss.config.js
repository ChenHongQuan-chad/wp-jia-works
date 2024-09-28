/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容
/*
 * @Description:
 * @Author: chad-Chen
 */
const path = require('path')
// theme：可定义颜色、字体、边框等跟视觉设计有关的内容；
// variants：为工具插件定义的变量；
// plugins：注册插件；
// important：设置 Tailwind 的工具类是否添加上!important；
// separator：分隔符；
// purge：去掉无用的文件和 CSS 内容
module.exports = {
    purge: ['./components/**/*.{vue,js}', './views/**/*.{vue,js}', './plugins/**/*.{js,ts}'],
    plugins: {
        autoprefixer: { grid: true },
        tailwindcss: {
            config: path.join(__dirname, 'tailwind.config.js')
        }
        // tailwindcss: './tailwind.config.js',
    },
    sourceMap: true || 'inline'
}
