<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <div class="single-blog w-full flex-col items-center rounded-md overflow-hidden shadow-md transition-shadow duration-1000 hover:shadow-lg md:flex md:max-w-sm">
        <div @click="$router.push(`/post/${blog.slug}`)" class="w-full">
            <div class="relative overflow-hidden h-auto 2xl:max-h-sm lg:max-h-xs" v-if="featImage">
                <img class="object-fill img-absolute transition-opacity" :src="featImage" :alt="title" srcset="" />
            </div>
            <div class="mt-4 mb-6 w-full px-4 text-black">
                <el-tag v-if="blog.tagName" size="small">{{ blog.tagName }}</el-tag>
                <h2 class="truncate mt-2 text-left text-xl uppercase" :title="title">
                    {{ title }}
                </h2>
                <p class="multiple-line text-base mt-2 w-full text-left" v-if="blog.excerpt.rendered" v-html="blog.excerpt.rendered"></p>
                <div class="flex lg:items-center text-sm mt-2 lg:flex-row xs:flex-col">
                    <div class="time-box">
                        <i class="el-icon-time text-primary-400"></i>
                        <time :datetime="dateFormat">{{ dateFormat }}</time>
                    </div>
                    <div class="author lg:ml-4">
                        <i class="el-icon-user text-primary-400"></i>
                        <span>{{ blog._embedded.author[0].name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'SingleBlog',
    props: {
        blog: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {},
    computed: {
        title() {
            return this.blog?.title?.rendered
        },
        dateFormat() {
            return moment(this.blog.date).format('DD-MM-YYYY')
        },
        featImage() {
            return this.blog._embedded['wp:featuredmedia'] ? this.blog._embedded['wp:featuredmedia'][0].source_url : false
        }
    }
}
</script>
<style lang="less" scoped>
.single-blog {
    img {
        transition: all 1s;
    }
    &:hover {
        img {
            transform: scale(1.08);
        }
    }
}
</style>
