/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容

import Vue from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './plugins/js_composer/assets/css/js_composer.min.css'
import ElementUI from './utils/element-ui'
import VueLazyLoad from 'vue-lazyload'
import VWave from 'v-wave'
import waterfall from 'vue-waterfall2'
import router from './router'
import App from './App.vue'
import store from './store'
import * as types from './store/mutation-types'
import './api/common'

AOS.init()
Vue.use(VWave)
Vue.use(VueLazyLoad, {
    // error: '/static/images/defaultAvatar.png', // 此处是图片加载失败时候 显示的图片
    // loading: '/static/images/defaultAvatar.png', // 此处是图片加载中 显示的图片
    attempt: 1, // 加载一屏图片
    preLoad: 1 // 失败尝试次数
})
Vue.use(waterfall)
Vue.use(ElementUI)
import './styles/index.less'

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    created() {
        this.$store.commit(types.RESET_LOADING_PROGRESS)
        this.$store.dispatch('getAllCategories') // 所有的分类
        this.$store.dispatch('getAllPages')
    },
    mounted() {
        // You'll need this for renderAfterDocumentEvent.
        document.dispatchEvent(new Event('render-event'))
    }
})
