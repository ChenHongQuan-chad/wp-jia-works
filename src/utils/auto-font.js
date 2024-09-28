/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容
import { isPcOrMobile } from '@/utils'

//设置根标签
export const autoFont = () => {
    let fontBase = 16
    let designWidth = 0
    const html = document.querySelector('html')
    let currentWidth = 0
    //判断是pc端，就设置固定宽度为750，可自行调整
    let isPcOrM = isPcOrMobile()
    if (isPcOrM === 'pc') {
        designWidth = 1920
        currentWidth = 1920
    } else if (isPcOrM === 'ipad') {
        designWidth = 1920
        currentWidth = 1920
    } else {
        fontBase = 24
        designWidth = 750
        currentWidth = html.clientWidth
        // 横屏时
        if (currentWidth > currentHeight) {
            currentWidth = currentHeight
        }
    }
    const currentHeight = html.clientHeight
    const scale = currentWidth / designWidth
    html.style.fontSize = `${fontBase * scale}px`
}
export default autoFont
