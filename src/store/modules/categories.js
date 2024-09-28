/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容
import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
    all: [],
    loaded: false
}

// getters
const getters = {
    // Returns an array all categories
    allCategories: state => state.all,
    allCategoriesLoaded: state => state.loaded,
    category: state => id => {
        let field = typeof id === 'number' ? 'id' : 'slug'
        let category = state.all.filter(item => item[field] === id)
        return category[0] ? category[0] : false
    }
}

// actions
const actions = {
    getAllCategories({ commit }) {
        api.getCategories(categories => {
            commit(types.STORE_FETCHED_CATEGORIES, { categories })
            commit(types.CATEGORIES_LOADED, true)
            commit(types.INCREMENT_LOADING_PROGRESS)
        })
    }
}

// mutations
const mutations = {
    [types.STORE_FETCHED_CATEGORIES](state, { categories }) {
        state.all = categories
    },

    [types.CATEGORIES_LOADED](state, bool) {
        state.loaded = bool
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
