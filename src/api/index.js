/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

import axios from 'axios'
import SETTINGS from '../settings'

export default {
    getCategories(cb) {
        axios
            .get(SETTINGS.API_BASE_PATH + 'categories?sort=name&per_page=50&_embed')
            .then(response => {
                cb(response.data.filter(c => c.name !== 'Uncategorized'))
            })
            .catch(e => {
                cb(e)
            })
    },

    getPages(cb) {
        axios
            .get(SETTINGS.API_BASE_PATH + 'pages?per_page=10&_embed') // 添加_embed，可以展示特色图
            .then(response => {
                cb(response.data)
            })
            .catch(e => {
                cb(e)
            })
    },

    getPage(id, cb) {
        if (!Number.isInteger(id) || !id) return false

        axios
            .get(SETTINGS.API_BASE_PATH + 'pages/' + id)
            .then(response => {
                cb(response.data)
            })
            .catch(e => {
                cb(e)
            })
    },

    async getPosts(params) {
        let res = await axios({
            url: `${SETTINGS.API_BASE_PATH}posts`,
            type: 'get',
            params
        })
        return res
    }
}
