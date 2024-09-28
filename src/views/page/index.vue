<!--
 * @Description: 页面
 * @Author: chad-Chen
-->
<template>
    <div class="page bg-gray-300" :class="`page-${pageSlug}`">
        <template v-if="allPagesLoaded">
            <div class="banner relative">
                <h1 class="absolute hidden text-center text-4xl uppercase text-black" :class="{ hidden: pageSlug === 'about' }">
                    {{ pageContent.title.rendered }}
                </h1>
                <div class="img-box" v-if="featImage">
                    <img :src="featImage" :alt="pageContent.title.rendered" srcset="" />
                </div>
            </div>
            <div class="page-content 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl sm:max-w-2xl mx-auto py-20" v-html="pageContent.content.rendered"></div>
        </template>
        <Loader v-else />
    </div>
</template>

<script>
import Loader from '@/components/partials/Loader.vue'
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            page: 'page',
            pageContent: 'pageContent',
            allPagesLoaded: 'allPagesLoaded'
        }),
        pageSlug() {
            return this.$route.params.pageSlug
        },
        pageContent() {
            let pageSlug = this.pageSlug
            return this.page(pageSlug)
        },
        featImage() {
            return this.pageContent._embedded['wp:featuredmedia'] ? this.pageContent._embedded['wp:featuredmedia'][0].source_url : false
        },
        acf() {
            return this.pageContent.acf
        }
    },

    components: {
        Loader
    }
}
</script>

<style lang="less" scoped>
/* page 内容 */
.page-content {
    /deep/.leading-10 {
        &.btn {
            line-height: 2.3rem;
        }
    }
    /deep/.wpcf7-form {
        display: grid;
        p {
            width: 100%;
        }
    }
}

.page {
    /deep/.relative {
        .wpb_singleimage_heading {
            position: absolute;
            bottom: 10rem;
            left: 50%;
            transform: translateX(-50%);
            @apply text-lg;
            max-width: 72rem;
        }
    }

    /deep/.page-content {
        .ship-category {
            li {
                text-align: center;
                a {
                    margin: 2rem auto;
                    display: inline-block;
                    .img-box {
                        width: 240px;
                        img {
                            transition: all 0.3 linear;
                            filter: grayscale(90%) brightness(180%);
                        }
                    }
                    &:hover,
                    &:focus {
                        .img-box {
                            img {
                                filter: contrast(2.5);
                            }
                        }
                    }
                }
            }
        }
    }
}
.page-contact {
    background-color: rgb(0, 62, 128);
    /deep/.page-content {
        p,
        h4 {
            color: #bae2f8;
        }
        p {
            line-height: 2;
        }
    }
}
</style>
