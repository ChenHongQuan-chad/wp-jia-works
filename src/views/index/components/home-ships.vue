<!--
 * @Description: 船
 * @Author: chad-Chen
-->

<template>
    <div class="home-ships">
        <slot>
            <div class="img-box">
                <img :src="require('@/assets/images/index/ships.jpg')" alt="" srcset="" />
            </div>
        </slot>
        <div v-if="allCategoriesLoaded">
            <div class="grid grid-cols-1 md:grid-cols-3" v-if="allCategories.length > 0">
                <div
                    @click="$router.push(`/category/${category.slug}`)"
                    v-for="(category, index) in allCategories"
                    :key="index"
                    class="2xl:py-20 xl:py-14 lg:py-6 xs:py-6 2xl:px-24 xl:px-16 xs:px-16 lg:px-8 transition-all border-primary-600 bg-primary-600 cursor-pointer"
                >
                    <div class="img-box">
                        <img :src="category.feat_image" alt="" srcset="" />
                    </div>
                    <div class="line-col" v-if="index !== allCategories.length - 1"></div>
                </div>
            </div>
            <el-empty :image-size="200" v-else></el-empty>
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SinglePost from '@/components/SinglePost'

export default {
    props: ['limit'],
    computed: {
        ...mapGetters({
            allCategories: 'allCategories',
            allCategoriesLoaded: 'allCategoriesLoaded'
        })
    },
    methods: {},
    components: {
        SinglePost
    },

    mounted() {}
}
</script>

<style lang="less" scoped>
.home-ships {
    .img-wrapper {
        .absolute {
            top: 1.25rem;
            right: 1.25rem;
        }
    }
    .transition-all {
        position: relative;
        .img-box {
            img {
                transition: all 0.3s linear;
            }
        }
        &:hover,
        &:focus {
            .img-box {
                img {
                    filter: grayscale(100%) brightness(300%);
                }
            }
        }

        .line-col {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 2px;
            height: 160px;
            background-color: #406385;
            @media (min-width: 640px) {
                height: 60px;
            }
            @media (min-width: 1024px) {
                height: 90px;
            }
        }
    }
}
</style>
