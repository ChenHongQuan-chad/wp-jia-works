<!--
 * @Description: da
 * @Author: Chad-Chen
-->
<template>
    <div class="ship-info">
        <div class="mx-auto 2xl:max-w-6xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl mt-20 mb-20 px-8 md:px-0" v-loading="loading">
            <div v-if="post">
                <h1 class="text-4xl mb-4 text-center ip">{{ post.title.rendered }}</h1>
                <chSwiper ref="img-box" :showPagination="false" :showNavigation="true" :loop="false" :swiperList="computedSwiper" v-if="computedSwiper.length > 0">
                    <template v-slot="scope">
                        <div class="img-box w-full relative overflow-hidden">
                            <img :src="scope.item.url" :alt="scope.item.alt" srcset="" />
                        </div>
                    </template>
                </chSwiper>
                <div class="content mt-2" v-html="post.content.rendered"></div>
            </div>
            <el-empty :image-size="200" v-else></el-empty>
        </div>
        <!-- 相关文章 -->
        <div class="bg-gray-200 py-16">
            <h3 class="text-center text-3xl font-normal uppercase">Related Content</h3>
            <div class="mt-6 recent-wrapper" v-loading="recentPostLoading">
                <div v-if="recentBlogList.length > 0" class="mx-auto 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl px-8 md:px-0">
                    <chSwiper
                        :spaceBetween="20"
                        slidesPerView="4"
                        :swiperList="recentBlogList"
                        v-if="recentBlogList.length > 0"
                        ref="img-box"
                        :showPagination="false"
                        :showNavigation="true"
                        :loop="false"
                    >
                        <template v-slot="scope">
                            <SingleShip class="mb-4" :post="scope.item"></SingleShip>
                        </template>
                    </chSwiper>
                </div>
                <el-empty :image-size="200" v-else></el-empty>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import SETTINGS from '@/settings'
import SingleShip from '@/components/SingleShip'
import chSwiper from '@/components/common/ch-swiper.vue'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

export default {
    data() {
        return {
            loading: false,
            post: false,
            recentBlogList: [],
            tags: [],
            recentPostLoading: false
        }
    },
    components: {
        SingleShip,
        chSwiper
    },

    watch: {
        $route: {
            handler(newVal) {
                this.init()
            },
            immediate: true
        },
        'computedSwiper.length': {
            handler(newV) {
                this.$nextTick(() => {
                    var viewer = new Viewer(this.$refs['img-box'].$el, {
                        // url: 'data-original'
                    })
                })
            }
        }
    },
    mounted() {},
    methods: {
        async init() {
            await this.getTagsName()
            await this.getPost()
            this.getRecentPost()
        },
        async getPost() {
            this.loading = true
            let res = await axios({
                url: `${SETTINGS.API_BASE_PATH}ship`,
                params: {
                    slug: this.$route.params.shipSlug, //按id过滤
                    _embed: true //表示表示除了读取文章外，还嵌入作者和相关连接
                }
            })
            this.loading = false
            let result = res.data[0]
            this.post = { ...result }
        },
        async getRecentPost() {
            this.recentPostLoading = true
            let res = await axios({
                url: `${SETTINGS.API_BASE_PATH}ship`,
                params: {
                    // 'filter[tag]': this.recentTag, //按tag名称过滤
                    tags: this.recentTag, //按id过滤
                    page: 1,
                    per_page: 100,
                    order: 'desc', //asc:升序，desc降序
                    orderby: 'date', //有效值为“date”，“relevance”，“id”，“include”，“title”和“slug” 有关其他集合支持的值
                    _embed: true //表示表示除了读取文章外，还嵌入作者和相关连接
                }
            })
            this.recentPostLoading = false
            this.recentBlogList = []
            if (res && res.status === 200) {
                this.recentBlogList = (res.data || [])
                    .filter(item => item.status === 'publish')
                    .map(item => ({
                        ...item,
                        ...(item.tags.length > 0 ? { tagName: this.calcTagName(item.tags[0]) } : {}),
                        date_format: moment(item.date).format('DD-MM-YYYY')
                    }))
            }
        },
        /**
         * 计算tag的名称
         * @param {*} id
         */
        calcTagName(id) {
            let findRes = this.tags.find(item => item.id === id)
            return findRes?.name
        },
        async getTagsName() {
            let res = await axios({
                url: `${SETTINGS.API_BASE_PATH}tags`,
                params: {
                    _embed: true //表示表示除了读取文章外，还嵌入作者和相关连接
                }
            })
            this.tags = []
            if (res && res.status === 200) {
                this.tags = res.data || []
            }
        }
    },
    computed: {
        computedSwiper() {
            let swiper = this.post.acf?.image_gallery || []
            console.log(swiper, 'swiper')
            return swiper
        },
        // 当前产品的分类ID
        recentTag() {
            return this.post['tags'][0]
        }
    }
}
</script>
<style lang="less" scoped>
.ship-info {
    /deep/.content {
        a {
            @apply text-blue-500;
            @apply font-bold;
            @apply underline;
        }
    }
}
.recent-wrapper {
    min-height: 330px;
}
</style>
