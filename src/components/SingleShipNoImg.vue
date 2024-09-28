<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <div class="single-ship single-ship-no-img py-3 overflow-hidden cursor-pointer rounded-md transition-all">
        <div class="w-full flex items-center justify-center">
            <h2 class="text-primary-400 multiple-line-3 mt-2 text-center text-xl uppercase" :title="post.title.rendered">
                <chLineBreak :text="post.title.rendered"></chLineBreak>
            </h2>
            <!-- <div class="text-primary-400 mt-2 multiple-line mb-0" v-if="post.excerpt.rendered" v-html="post.excerpt.rendered"></div> -->
        </div>
    </div>
</template>

<script>
import chLineBreak from '@/components/common/ch-line-break.vue'
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
    },
    components: {
        chLineBreak
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
