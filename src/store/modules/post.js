/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容
/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

import api from '../../api'
import * as types from '../mutation-types'

const createPostSlug = post => {
    let slug = post.link.replace(window.location.protocol + '//' + window.location.host, '')
    post.slug = slug
    return post
}

// initial state
const state = {
    recent: [],
    loaded: false
}

// getters
const getters = {
    recentPosts: state => limit => {
        if (!limit || !Number.isInteger(limit) || typeof limit == 'undefined') {
            return state.recent
        }
        let recent = state.recent
        return recent.slice(0, limit)
    },

    recentPostsLoaded: state => state.loaded
}

// actions
const actions = {
    async getPosts({ commit }, { limit, acf }) {
        const { show_in_page } = acf
        let params = {
            page: 1,
            per_page: 100,
            order: 'desc', //asc:升序，desc降序
            orderby: 'date', //有效值为“date”，“relevance”，“id”，“include”，“title”和“slug” 有关其他集合支持的值
            _embed: true
        }
        let { data } = await api.getPosts(params)
        let finalPosts = (data || []).filter(post => post.acf.show_in_page === show_in_page).slice(0, limit)
        commit(types.STORE_FETCHED_POSTS, { posts: finalPosts })
        commit(types.POSTS_LOADED, true)
        commit(types.INCREMENT_LOADING_PROGRESS)
    }
}

// mutations
const mutations = {
    [types.STORE_FETCHED_POSTS](state, { posts }) {
        state.recent = posts
    },

    [types.POSTS_LOADED](state, val) {
        state.loaded = val
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
