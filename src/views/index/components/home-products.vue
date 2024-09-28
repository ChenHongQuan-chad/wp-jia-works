<!--
 * @Description: 首页展示的产品
 * @Author: chad-Chen
-->
<template>
    <div class="home-products">
        <slot></slot>
        <div v-if="recentPostsLoaded" class="mt-4">
            <div class="grid gap-4 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 xs:grid-cols-2" v-if="recentPosts(limit).length > 0">
                <SingleBlog
                    :blog="post"
                    v-for="(post, index) in recentPosts(limit)"
                    :key="post.id"
                    data-aos="fade-up"
                    data-aos-duration="1100"
                    :data-aos-delay="index * 300"
                ></SingleBlog>
            </div>
            <el-empty :image-size="200" v-else></el-empty>
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SingleBlog from '@/components/SingleBlog'

export default {
    props: ['limit'],
    computed: {
        ...mapGetters({
            recentPosts: 'recentPosts',
            recentPostsLoaded: 'recentPostsLoaded'
        })
    },

    methods: {},
    components: {
        SingleBlog
    },
    mounted() {
        this.$store.dispatch('getPosts', { limit: this.limit, acf: { show_in_page: true } })
    }
}
</script>
