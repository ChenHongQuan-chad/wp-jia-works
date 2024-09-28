<!--
 * @Description:
 * @Author: chad-Chen
-->
<template>
    <div class="post-info">
        <div class="mx-auto 2xl:max-w-6xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl mt-20 mb-20 px-8 md:px-0" v-loading="loading">
            <div v-if="post">
                <h1 class="text-4xl mb-4 text-center">{{ post.title.rendered }}</h1>
                <div class="mb-16 flex items-center justify-center">
                    <div class="time-box">
                        <i class="el-icon-time text-primary-400"></i>
                        <time :datetime="post.date_format">{{ post.date_format }}</time>
                    </div>
                    <div class="author ml-4">
                        <i class="el-icon-user text-primary-400"></i>
                        <span>{{ post._embedded.author[0].name }}</span>
                    </div>
                </div>
                <div class="content" v-html="post.content.rendered"></div>
            </div>
            <el-empty :image-size="200" v-else></el-empty>
        </div>
        <!-- 相关文章 -->
        <div class="bg-gray-200 py-16">
            <h3 class="mb-16 text-center text-3xl font-bold uppercase">Related Content</h3>
            <div v-loading="recentPostLoading" class="recent-wrapper">
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
                            <SingleBlog :blog="scope.item"></SingleBlog>
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
import SingleBlog from '@/components/SingleBlog'
import chSwiper from '@/components/common/ch-swiper.vue'
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
        SingleBlog,
        chSwiper
    },
    watch: {
        $route: {
            handler(newVal) {
                this.init()
            },
            immediate: true
        }
    },
    beforeMount() {},

    methods: {
        async init() {
            await this.getTagsName()
            await this.getPost()
            this.getRecentPost()
        },
        async getPost() {
            this.loading = true
            let res = await axios({
                url: `${SETTINGS.API_BASE_PATH}posts`,
                params: {
                    slug: this.$route.params.postSlug, //按id过滤
                    _embed: true //表示表示除了读取文章外，还嵌入作者和相关连接
                }
            })
            this.loading = false
            let result = res.data[0]
            this.post = { ...result, date_format: moment(result.date).format('DD-MM-YYYY') }
        },
        async getRecentPost() {
            this.recentPostLoading = true
            let res = await axios({
                url: `${SETTINGS.API_BASE_PATH}posts`,
                params: {
                    // 'filter[tag]': this.recentTag, //按tag名称过滤
                    tags: this.recentTag, //按id过滤
                    page: 1,
                    per_page: 50,
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
        // 当前产品的分类ID
        recentTag() {
            return this.post['tags'][0]
        }
    }
}
</script>
<style lang="less" scoped>
.post-info {
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
