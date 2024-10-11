<!--
 * @Description:
 * @Author: chad-Chen
-->
<template>
    <nav class="site-header w-full z-50" :style="`height:${!isHome && isPcOrIpad ? '78px' : !isHome ? '54px' : ''}`">
        <div class="transition-all fixed w-full" :class="[{ glasses: !isHome || scrollTop > 0 }]">
            <div class="mx-auto flex 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl flex-wrap items-center">
                <div class="site-header-box flex w-full flex-shrink-0 items-center justify-between text-white">
                    <h1 v-if="this.$route.path === '/'" class="flex items-center flex-shrink-0">
                        <router-link to="/" class="inline-block 2xl:pl-4 2xl:pr-12 lg:pl-0 lg:pr-8" v-wave>
                            <img
                                class="2xl:w-40 lg:w-32"
                                :src="require('@/assets/images/common/logo.png')"
                                alt="Flyto"
                                srcset=""
                            />
                        </router-link>
                    </h1>
                    <router-link v-else to="/" class="2xl:pl-4 2xl:pr-12 lg:pl-0 lg:pr-8" v-wave>
                        <img
                            class="2xl:w-40 lg:w-32"
                            :src="require('@/assets/images/common/logo.png')"
                            alt="Flyto"
                            srcset=""
                        />
                    </router-link>

                    <!-- S 移动端按钮 -->
                    <div class="block sm:hidden">
                        <button
                            @click="showDrawer = true"
                            v-wave
                            class="border rounded flex items-center bg-transparent px-3 py-5 uppercase text-white hover:border-white hover:text-white"
                        >
                            <svg
                                class="ml-2 h-8 w-8 fill-current"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                    <el-drawer :append-to-body="true" :visible.sync="showDrawer" direction="rtl" size="50%">
                        <chMenus
                            @click-menu="showDrawer = false"
                            :menuList="links"
                            :defaultAct="$route.path"
                            mode="vertical"
                        ></chMenus>
                    </el-drawer>
                    <!-- E 移动端按钮 -->
                    <h2
                        class="little-scroll-bar text-xl menus flex-1 flex items-center justify-center overflow-x-auto whitespace-nowrap"
                    >
                        <chMenus :menuList="links" :defaultAct="$route.path"></chMenus>
                    </h2>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import chMenus from '@/components/common/ch-menus'
import { isPcOrMobile, getRootUrl } from '@/utils'
export default {
    data() {
        return {
            showDrawer: false,
            scrollTop: 0,
            isHome: false,
            isPcOrIpad: false
        }
    },
    watch: {
        $route: {
            handler(newV, oldV) {
                this.isPcOrIpad = ['ipad', 'pc'].includes(isPcOrMobile())
                this.isHome = newV.fullPath === '/'
                if (this.isHome) {
                    this.getScrollTop()
                }
            },
            immediate: true
        }
    },
    methods: {
        // 跳转到中文
        handleClick() {
            let protocol = window.location.protocol //获取http,http://请求协议头
            location.href = `${protocol}//han.agricorehk.com/`
        },
        getScrollTop() {
            const handleScroll = () => {
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            }
            window.addEventListener('scroll', handleScroll)
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('scroll', handleScroll)
            })
        }
    },
    computed: {
        links() {
            return [
                {
                    path: '/about-us',
                    name: 'ABOUT US'
                },
                {
                    path: '/ship-all',
                    name: 'FLEET'
                },
                {
                    path: '/',
                    id: 'services',
                    name: 'SERVICES',
                    children: [
                        {
                            path: '/fleet',
                            name: 'Ship Management'
                        },
                        {
                            path: '/shipping-chartering-sector',
                            name: 'Shipping Chartering Sector'
                        },

                        {
                            path: '/shipping-fund-sector',
                            name: 'Shipping Fund Sector'
                        },
                        {
                            path: '/equity-investment-sector',
                            name: 'Equity Investment Sector'
                        }
                    ]
                },
                {
                    path: '/our-value',
                    name: 'OUR VALUE'
                },
                {
                    path: '/contact',
                    name: 'CONTACT'
                }
            ]
        }
    },
    components: {
        chMenus
    }
}
</script>

<style lang="less" scoped>
h2 {
    .router-link-exact-active {
        @apply text-red-600;
    }
}

.block {
    .uppercase {
        font-size: 24px;
    }
}
.el-drawer__wrapper {
    ::v-deep .el-drawer {
        background-color: black;
        .el-drawer__header {
            margin-bottom: 1rem;
            color: #fff;
        }
    }
}
</style>
