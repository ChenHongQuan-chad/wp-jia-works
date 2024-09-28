<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <div
        @click="$router.push(`/post/${post.slug}`)"
        class="single-post overflow-hidden cursor-pointer w-full flex-col items-center rounded-md shadow-md transition-all hover:shadow-lg md:flex md:max-w-full md:max-w-sm"
    >
        <div class="relative overflow-hidden md:h-64 md:w-full" v-if="featImage">
            <img class="object-fill img-absolute transition-opacity" :src="featImage" :alt="post.title.rendered" srcset="" />
        </div>
        <div class="w-full px-4 py-6" v-if="post.excerpt.rendered">
            <p class="multiple-line" v-html="post.excerpt.rendered"></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SinglePost',
    props: {
        post: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {},
    computed: {
        featImage() {
            return this.post._embedded['wp:featuredmedia'] ? this.post._embedded['wp:featuredmedia'][0].source_url : false
        }
    }
}
</script>
<style lang="less" scoped>
.single-post {
    transition: all 0.3s ease-in-out;
    .relative {
        .img-absolute {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: 100%;
            transition: all 0.3s ease-in-out;
        }
    }
    &:hover,
    &:focus {
        .img-absolute {
            transform: translate(-50%, -50%) scale(1.1);
        }
    }
}
</style>
