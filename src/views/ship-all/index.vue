<template>
    <div class="ship-all">
        <!-- S 面包屑 -->
        <!-- <el-breadcrumb class="mt-10" separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryInfo.name }}</el-breadcrumb-item>
      </el-breadcrumb> -->
        <!-- E 面包屑 -->
        <!--S 产品列表 -->
        <div class="banner relative">
            <div class="img-box">
                <img :src="require(`@/assets/images/category/capesize.jpg`)" alt="" srcset="" />
            </div>
        </div>

        <div class="px-8 pb-16 md:px-0 bg-gray-200" v-loading="postLoading">
            <div class="mx-auto 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl lg:flex">
                <div class="lg:w-1/3 xs:w-full" :class="[{ 'mt-12 pb-12 bt-dash bb-dash': !isPcOrIpad && index === 1 }]" v-for="(item, index) in allCategories" :key="index">
                    <div class="icon-box w-72 mx-auto pt-16">
                        <img :src="item.feat_image" alt="" srcset="" />
                    </div>
                    <div class="ships-single mt-10 flex flex-wrap" :class="[{ 'bl-dash br-dash': isPcOrIpad && index === 1 }]">
                        <template v-if="getCategoryShip(item.id).length > 0">
                            <SingleShip class="flex-shrink-0 lg:w-full xs:w-1/2" :post="item" :key="ind" v-for="(item, ind) in getCategoryShip(item.id)"></SingleShip>
                        </template>
                        <el-empty :image-size="200" class="w-full" v-else></el-empty>
                    </div>
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
import SingleShip from '@/components/SingleShipNoImg'
export default {
    name: 'shipAll',
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
        // 过滤当前id对应的产品
        getCategoryShip(id) {
            return this.allShipList.filter(item => item.categories[0] === id)
        },
        async getPost() {
            this.postLoading = true
            let res = await axios({
                url: `${SETTINGS.API_BASE_PATH}ship`,
                params: {
                    // categories: this.categoryInfo.id,
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
            allCategories: 'allCategories',
            allCategoriesLoaded: 'allCategoriesLoaded'
        })
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
}
</style>
