<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <!-- @click="$router.push(`/ship/${post.slug}`)" -->
    <div class="single-ship overflow-hidden cursor-pointer flex-col items-center rounded-md shadow-md transition-all hover:shadow-lg md:flex md:max-w-sm">
        <div class="relative overflow-hidden md:h-64 md:w-full" v-if="featImage">
            <img class="lg:w-auto xs:w-full object-fill img-absolute transition-opacity" :src="featImage" :alt="post.title.rendered" srcset="" />
        </div>
        <div class="w-full px-4 pt-4 pb-4">
            <h1 class="truncate mt-2 text-left text-xl uppercase" :title="post.title.rendered">
                {{ post.title.rendered }}
            </h1>
            <p class="mt-2 multiple-line mb-0" v-if="post.excerpt.rendered" v-html="post.excerpt.rendered"></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SingleShip',
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
.single-ship {
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
