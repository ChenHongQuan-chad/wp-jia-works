/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

export const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop)
        window.scrollTo(0, c - c / 8)
    }
}
//判断pc端还是移动端
export const isPcOrMobile = () => {
    if (/Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)) {
        return 'mobile'
    } else if (/iPod|iPad/i.test(navigator.userAgent)) {
        return 'ipad'
    }
    return 'pc'
}
export const scrollIntoView = el => {
    el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
}
//对访问路径进行封装 没有name
export function getRootUrl() {
    //获取当前网址，如： http://localhost:8083/poseidon-web/demo
    let locationHref = window.document.location.href,
        //获取主机地址之后的目录，如：poseidon-web/demo
        pathName = window.document.location.pathname,
        pathNameInd = locationHref.indexOf(pathName),
        localhostPath = locationHref.substring(0, pathNameInd)
    //获取主机地址，如： http://localhost:9000/
    return `${localhostPath}/`
}
export function getBaseUrl() {
    let curWwwPath = window.document.location.href
    let pathName = window.document.location.pathname
    return curWwwPath.substring(0, curWwwPath.indexOf(pathName)) + pathName.substring(0, pathName.substr(1).indexOf('/') + 1) + '/'
}
