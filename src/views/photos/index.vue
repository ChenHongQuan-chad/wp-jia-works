<template>
    <div class="category-blog">
        <!-- S 面包屑 -->
        <!-- <el-breadcrumb class="mt-10" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{categoryInfo.name}}</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- E 面包屑 -->
        <!--S 产品列表 -->
        <div class="px-8 pt-8 pb-4 md:px-0 bg-gray-200" v-loading="postLoading">
            <waterfall class="mx-auto max-w-8xl" :col="4" :data="srcList" :gutterWidth="30" v-if="srcList.length > 0">
                <el-image
                    class="mb-4"
                    v-for="(src, index) in srcList"
                    :key="index"
                    :src="src"
                    :preview-src-list="srcList"
                >
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </waterfall>
            <el-empty :image-size="80" v-else></el-empty>
        </div>
        <!-- E 产品列表 -->
    </div>
</template>

<script>
import moment from 'moment'
moment({
    lang: 'zh-cn'
})
import { mapGetters } from 'vuex'
import axios from 'axios'
import SETTINGS from '@/settings'
import { scrollToTop } from '@/utils'
export default {
    name: 'blogCollections',
    data() {
        return {
            categoryInfo: {}, //当前分类的信息
            allBlogList: [], //所有的分页
            srcList: [], //图片
            tags: [],
            postLoading: false,
            currentPage: 1,
            pageSize: 20,
            activeQA: '1'
        }
    },
    mounted() {},
    watch: {
        '$route.path': {
            handler() {
                this.init()
            },
            immediate: true
        }
    },
    methods: {
        async init() {
            let path = this.$route.path
            let lastInd = path.lastIndexOf('/')
            if (lastInd !== -1) {
                let postType = path.slice(lastInd + 1)
                await this.getCategory(postType)
                await this.getTagsName()
            }
        },
        async getCategory(postType) {
            this.postLoading = true
            let res = await axios({
                url: `${SETTINGS.API_BASE_PATH}${postType}`,
                params: {
                    page: 1,
                    per_page: 100,
                    order: 'desc', //asc:升序，desc降序
                    orderby: 'date', //有效值为“date”，“relevance”，“id”，“include”，“title”和“slug” 有关其他集合支持的值
                    _embed: '' //表示表示除了读取文章外，还嵌入作者和相关连接
                }
            })
            this.postLoading = false
            if (res && res.status === 200) {
                this.allBlogList = (res.data || [])
                    .filter(item => item.status === 'publish')
                    .map(item => ({
                        ...item,
                        ...(item?.tags?.length > 0 ? { tagName: this.calcTagName(item.tags[0]) } : {}),
                        date_format: moment(item.date).format('DD-MM-YYYY')
                    }))
            } else {
                this.allBlogList = []
            }
            this.srcList = this.allBlogList.map(item =>
                item._embedded['wp:featuredmedia']
                    ? item._embedded['wp:featuredmedia'][0].source_url
                    : require('@/assets/images/common/logo.png')
            )
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
                    _embed: '' //表示表示除了读取文章外，还嵌入作者和相关连接
                }
            })
            this.tags = []
            if (res && res.status === 200) {
                this.tags = res.data || []
            }
        }
    },
    computed: {
        ...mapGetters({
            page: 'page',
            allPagesLoaded: 'allPagesLoaded'
        }),
        pageContent() {
            let pageSlug = this.$route.params.pageSlug || 14
            return this.page(pageSlug)
        },
        acf() {
            return this.pageContent.acf
        },
        // 关注我们
        computedMedias() {
            return {
                title: this.acf?.title3,
                methods: this.acf?.methods,
                medias: this.acf?.medias
            }
        }
    },
    components: {}
}
</script>
<style lang="less" scoped>
/deep/.el-collapse {
    .el-collapse-item__header {
        height: 55px;
        line-height: 55px;
        font-size: 18px;
    }

    .el-collapse-item__content {
        font-size: 16px;
        line-height: 1.45;
    }
}
</style>
