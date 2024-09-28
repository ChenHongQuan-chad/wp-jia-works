<template>
    <div class="category-ship">
        <!-- S 面包屑 -->
        <!-- <el-breadcrumb class="mt-10" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ categoryInfo.name }}</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- E 面包屑 -->
        <!--S 产品列表 -->
        <div class="banner relative">
            <div class="title hidden absolute top-0 text-4xl text-center text-white" ref="scrollView">
                <h1 class="uppercase">{{ categoryInfo.name }}</h1>
                <p class="mt-8" v-if="categoryInfo.description">{{ categoryInfo.description }}</p>
            </div>
            <div class="img-box">
                <img :src="require(`@/assets/images/category/${collectionSlug || 'capesize'}.jpg`)" alt="" srcset="" />
            </div>
        </div>

        <div class="px-8 pt-8 pb-4 md:px-0 bg-gray-200" v-loading="postLoading">
            <div class="mx-auto 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl lg:flex">
                <div class="2xl:w-1/3 xl:w-1/3 lg:w-2/5 xs:w-full 2xl:pr-16 xl:pr-12 lg:pr-8 xs:pr-0 lg:mb-0 xs:mb-8">
                    <div class="icon-box w-72 mx-auto">
                        <img :src="categoryInfo.feat_image" alt="" srcset="" />
                    </div>
                </div>
                <div class="2xl:w-2/3 xl:w-2/3 lg:w-3/5 xs:w-full">
                    <waterfall :col="1" :data="allShipList" :gutterWidth="30" v-if="allShipList.length > 0">
                        <div
                            :class="isPcOrIpad && index % 2 === 0 ? `pr-4` : isPcOrIpad ? `pl-4` : ''"
                            class="mb-8 lg:w-1/2 xs:w-full flex-shrink-0"
                            v-for="(post, index) in allShipList"
                            :key="index"
                        >
                            <SingleShip :post="post"></SingleShip>
                        </div>
                    </waterfall>
                    <el-empty :image-size="200" v-else></el-empty>
                </div>
            </div>
        </div>
        <!-- E 产品列表 -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import SETTINGS from '@/settings'
import { isPcOrMobile } from '@/utils'
import SingleShip from '@/components/SingleShipRow'
export default {
    name: 'blogCollections',
    data() {
        return {
            isPcOrIpad: true,
            allShipList: [], //所有的分页
            tags: [],
            postLoading: false,
            currentPage: 1,
            pageSize: 20,
            activeQA: '1'
        }
    },
    mounted() {
        this.init()
    },
    watch: {},
    methods: {
        async init() {
            this.isPcOrIpad = ['ipad', 'pc'].includes(isPcOrMobile())
            await this.getTagsName()
            await this.getPost()
        },
        async getPost() {
            this.postLoading = true
            let res = await axios({
                url: `${SETTINGS.API_BASE_PATH}ship`,
                params: {
                    categories: this.categoryInfo.id,
                    page: 1,
                    per_page: 100,
                    order: 'desc', //asc:升序，desc降序
                    orderby: 'date', //有效值为“date”，“relevance”，“id”，“include”，“title”和“slug” 有关其他集合支持的值
                    _embed: true //表示表示除了读取文章外，还嵌入作者和相关连接
                }
            })
            this.postLoading = false
            this.allShipList = []
            if (res && res.status === 200) {
                this.allShipList = (res.data || [])
                    .filter(item => item.status === 'publish')
                    .map(item => ({
                        ...item,
                        ...(item.tags.length > 0 ? { tagName: this.calcTagName(item.tags[0]) } : {})
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
        ...mapGetters({
            category: 'category',
            allCategoriesLoaded: 'allCategoriesLoaded'
        }),
        collectionSlug() {
            return this.$route.params.collectionSlug
        },
        categoryInfo() {
            console.log(this.category(this.collectionSlug))
            return this.category(this.collectionSlug)
        },
        acf() {
            return this.categoryInfo.acf
        }
    },
    components: {
        SingleShip
    }
}
</script>
<style lang="less" scoped>
.banner {
    .title {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    // &::before {
    //     content: '';
    //     width: 100%;
    //     height: 100%;
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
    // }
}
</style>
