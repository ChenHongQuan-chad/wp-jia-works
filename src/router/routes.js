/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

import Home from '../views/index'
import post from '../views/post/index.vue'
import ship from '../views/ship/index.vue'
import shipCollections from '../views/ship-collections/index.vue'
import photos from '../views/photos/index.vue'
import video from '../views/video/index.vue'
import articles from '../views/articles/index.vue'
import page from '../views/page/index.vue'
export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/articles',
        name: 'articles',
        component: articles
    },
    {
      path: '/photos',
      name: 'photos',
      component: photos
  },
    {
      path: '/graphics',
      name: 'graphics',
      component: photos
  },
    {
      path: '/video',
      name: 'video',
      component: video
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
