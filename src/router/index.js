/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import SETTINGS from '../settings'
const isDev = process.env.NODE_ENV === 'development'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history',
    base: isDev ? '' : SETTINGS.PREPEND_PATH,
    // Prevents window from scrolling back to top
    // when navigating between components/views
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
router.beforeEach((to, from, next) => {
    // console.log(from, '从哪里来')
    // console.log(to, '到哪里去')
    document.title = 'Agricore Shipping(HK) Limited'
    next()
})

router.afterEach(to => {
    // (to, from)
    // Add a body class specific to the route we're viewing
    let body = document.querySelector('body')

    const slug = !to.params.postSlug ? to.params.pageSlug : to.params.postSlug
    body.classList.add('vue--page--' + slug)
    document.title = 'Agricore Shipping(HK) Limited'
})

export default router
