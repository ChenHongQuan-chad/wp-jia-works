<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <div id="my-app" class="flex flex-col md:min-h-screen">
        <app-header />

        <transition name="loader-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <progress-bar :show-loader="showLoader" :loader-style="loaderStyle" />
        </transition>

        <transition name="page-transition" mode="out-in" appear>
            <div class="site-content flex-1 bg-gray-200">
                <router-view></router-view>
            </div>
        </transition>

        <app-footer />
    </div>
</template>

<script>
import { isPcOrMobile, autoFont } from '@/utils/auto-font'

import { mapGetters, mapActions, mapMutations } from 'vuex'
import Header from './components/partials/Header.vue'
import Footer from './components/partials/Footer.vue'
import ProgressBar from './components/partials/ProgressBar.vue'
// import { startSakura } from '@/utils/snowflake-full.js' //下雪
export default {
    data() {
        return {
            showLoader: true
        }
    },
    computed: {
        ...mapGetters({
            isLoading: 'isLoading',
            loadingProgress: 'loadingProgress',
            page: 'page',
            allPagesLoaded: 'allPagesLoaded'
        }),
        pageContent() {
            return this.page(14)
        },
        acf() {
            return this.pageContent.acf
        },
        loaderStyle() {
            return `width: ${this.loadingProgress}%;`
        }
    },
    mounted() {
        this.init()
    },
    components: {
        appHeader: Header,
        appFooter: Footer,
        ProgressBar
    },
    methods: {
        init() {
            autoFont()
            window.addEventListener('resize', autoFont)
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', autoFont)
            })
        }
    },
    watch: {
        // watch the value of isLoading and once it's false hide the loader
        isLoading(val) {
            if (val == false) {
                let self = this
                setTimeout(function () {
                    self.showLoader = false
                }, 1000)
            }
        }
    }
}
</script>
