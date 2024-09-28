/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

import Home from '../views/index'
import post from '../views/post/index.vue'
import ship from '../views/ship/index.vue'
import shipCollections from '../views/ship-collections/index.vue'
import shipAll from '../views/ship-all/index.vue'
import page from '../views/page/index.vue'
export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/ship-all',
        name: 'shipAll',
        component: shipAll
    },
    {
        path: '/:pageSlug',
        name: 'page',
        component: page
    },

    {
        path: '/category/:collectionSlug',
        name: 'shipCollections',
        component: shipCollections
    },
    {
        path: '/ship/:shipSlug',
        name: 'ship',
        component: ship
    },
    {
        path: '/post/:postSlug',
        name: 'post',
        component: post
    }
]
