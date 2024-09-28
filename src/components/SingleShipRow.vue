<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <!-- @click="$router.push(`/ship/${post.slug}`)" -->
    <div class="single-ship overflow-hidden cursor-pointer w-full flex items-center rounded-md shadow-md transition-all hover:shadow-lg">
        <div class="w-3/5 relative overflow-hidden lg:h-56 xs:h-48" v-if="featImage">
            <img class="lg:w-auto xs:w-full object-fill img-absolute transition-opacity" :src="featImage" :alt="post.title.rendered" srcset="" />
        </div>
        <div class="w-2/5 px-4 pt-4 pb-4">
            <h2 class="mt-2 text-left text-xl uppercase" :title="post.title.rendered">
                <chLineBreak :text="post.title.rendered"></chLineBreak>
            </h2>
            <p class="mt-2 multiple-line mb-0" v-if="post.excerpt.rendered" v-html="post.excerpt.rendered"></p>
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
