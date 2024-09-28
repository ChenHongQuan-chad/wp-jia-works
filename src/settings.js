/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

const isDev = process.env.NODE_ENV === 'development'
// let PREPEND_PATH = '/en'
let PREPEND_PATH = ''

export default {
    // How many different dispatched actions determine loading progress
    // This is likely determined by how many dispatched actions you have below
    // in the created() method
    PREPEND_PATH, //网站前缀
    LOADING_SEGMENTS: 1,
    API_BASE_PATH: `${isDev ? '' : PREPEND_PATH}/wp-json/wp/v2/`,
    API_ACF_PATH: `${isDev ? '' : PREPEND_PATH}/wp-json/acf/v3/`
}
