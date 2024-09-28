<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <div class="page page-home">
        <!-- S 首页轮播 -->
        <div class="home-swiper-wrapper relative">
            <chSwiper :swiperList="computedSwiper" :loop="true">
                <template v-slot="scope">
                    <div class="img-box w-full relative overflow-hidden">
                        <img class="trans-scale" :src="scope.item.image.url" :alt="scope.item.image.alt" srcset="" />
                    </div>
                </template>
            </chSwiper>
            <div class="info absolute top-0 z-10 w-full">
                <div class="2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl mx-auto 2xl:mt-64 lg:mt-48 xs:mt-16">
                    <div data-aos="fade-up" data-aos-duration="1100" data-aos-delay="0" class="description text-white text-3xl break-words">
                        <chLineBreak :text="computedSwiper[0].description"></chLineBreak>
                    </div>
                    <el-button
                        size="small"
                        type="primary"
                        data-aos="fade-up"
                        data-aos-duration="1100"
                        data-aos-delay="300"
                        class="mt-3"
                        plain
                        @click="$router.push(computedSwiper[0].link)"
                    >
                        {{ computedSwiper[0].button }}
                    </el-button>
                </div>
            </div>
        </div>

        <!-- E 首页轮播 -->
        <!-- S 所有的icons -->
        <div class="bg-white" id="services">
            <homeIcons class="mt-8 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl mx-auto" :list="computedIcons"></homeIcons>
        </div>
        <!-- E 所有的icons -->

        <!-- S 集团地址 -->
        <div class="bg-white">
            <home-group class="mt-8 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl mx-auto" :content="computedGroup"></home-group>
        </div>
        <!-- E 集团地址 -->

        <!-- S 船只分类 -->
        <homeShips class="mt-4 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl mx-auto" data-aos="fade-up" data-aos-duration="1100" data-aos-delay="0"></homeShips>
        <!-- E 船只分类 -->

        <!-- S 相关产品 -->
        <homeProducts class="mt-8 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl mx-auto px-8 md:px-0" limit="4">
            <h2 class="title text-2xl uppercase" data-aos="fade-up" data-aos-duration="1100" data-aos-delay="0">NEWS</h2>
        </homeProducts>
        <!-- E 相关产品 -->

        <!--S 邮箱地址 -->
        <div class="bg-primary-600 mt-8">
            <home-emails class="py-16 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl mx-auto" :content="computedEmail"></home-emails>
        </div>
        <!--E 邮箱地址 -->

        <!-- S 页面内容 -->
        <div class="page-content bg-gray-100" v-if="pageContent.content.rendered">
            <div class="py-16 max-w-3xl mx-auto px-8 md:px-0" v-html="pageContent.content.rendered"></div>
        </div>
        <!-- E 页面内容 -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import chSwiper from '@/components/common/ch-swiper.vue'
import chLineBreak from '@/components/common/ch-line-break.vue'
import homeIcons from './components/home-icons.vue'
import homeGroup from './components/home-group.vue'
import homeShips from './components/home-ships.vue'
import homeProducts from './components/home-products.vue'
import PagesWidget from '@/components/widgets/Pages.vue'
import HomeEmails from './components/home-emails.vue'

export default {
    data() {
        return {
            swiperList: []
        }
    },
    computed: {
        ...mapGetters({
            page: 'page',
            allPagesLoaded: 'allPagesLoaded'
        }),
        pageContent() {
            let pageSlug = this.$route.params.pageSlug || 52 //首頁
            return this.page(pageSlug)
        },
        acf() {
            return this.pageContent.acf
        },
        computedSwiper() {
            return this.acf?.swiper || []
        },
        computedIcons() {
            return this.acf?.icons || []
        },
        computedGroup() {
            return this.acf?.group_address || []
        },
        computedEmail() {
            return this.acf?.email_address || []
        }
    },
    mounted() {},
    components: {
        chSwiper,
        chLineBreak,
        homeIcons,
        homeGroup,
        homeProducts,
        PagesWidget,
        homeShips,
        HomeEmails
    }
}
</script>

<style lang="less" scoped>
/deep/.wpcf7 {
    .wpcf7-form {
        p {
            > span {
                display: block;
            }
            &.col-span-2 {
                .wpcf7-form-control {
                    &:not(.wpcf7-submit) {
                        display: block;
                        margin: 10px 0 0;
                        padding: 25px 30px;
                    }
                }
            }
        }
    }
}
</style>
