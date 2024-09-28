<!--
 * @Description: 
 * @Author: chad-Chen
-->
<template>
  <div class="widget recent-posts">
      <slot></slot>
    <div v-if="recentPostsLoaded">
        <div class="grid  gap-8 grid-cols-4 mt-8" v-if="recentPosts(limit).length>0" >
            <SinglePost class="mb-8" :post="post" v-for="(post) in recentPosts(limit)" :key="post.id"></SinglePost>
        </div>
        <el-empty :image-size="200" v-else></el-empty>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SinglePost from '@/components/SinglePost'

export default {
  props: ['limit'],
  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsLoaded: 'recentPostsLoaded',
    }),
  },

  methods: {
   
  },
  components: {
    SinglePost,
  },

  mounted() {
    this.$store.dispatch('getPosts', { limit: this.limit });
  },
};
</script>
