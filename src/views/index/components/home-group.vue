<!--
 * @Description:
 * @Author: Chad-Chen
-->
<template>
    <div class="home-group">
        <div class="group-top 2xl:flex xl:flex lg:block" data-aos="fade-up" data-aos-duration="1100" data-aos-delay="0">
            <div class="left 2xl:w-2/6 xl:w-5/12 lg:w-full">
                <div class="img-box" :style="`height: 413px;background:url(${content.group}) top center / 100% auto no-repeat `"></div>
            </div>
            <div class="right 2xl:w-4/6 xl:w-7/12 lg:w-full">
                <div class="img-box relative">
                    <ul class="absolute w-full h-full">
                        <li
                            :style="`left:${item.x}px;top:${item.y}px;font-size:${item.fontsize}px`"
                            class="text-gray-400 cursor-pointer transition-all hover:text-gray-200 absolute"
                            v-for="(item, index) in content.address"
                            :key="index"
                            data-aos="zoom-in"
                            data-aos-duration="1100"
                            :data-aos-delay="300 * (index + 1)"
                            @click="$router.push('/contact')"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="group-bottom flex bg-blue-200 mt-4 py-12">
            <div class="2xl:w-1/6 xl:w-3/12 lg:w-2/6 2xl:pl-8 xl:pl-6 lg:pl-4">
                <el-button size="small" type="primary" paint @click="$router.push(content.info.url)">{{ content.info.button_name }}</el-button>
            </div>
            <div class="2xl:w-5/6 xl:w-9/12 lg:w-4/6 2xl:pr-32 xl:pr-16 lg:pr-4">
                <chLineBreak :text="content.info.description"></chLineBreak>
            </div>
        </div>
    </div>
</template>

<script>
import chLineBreak from '@/components/common/ch-line-break.vue'
export default {
    props: {
        content: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        chLineBreak
    }
}
</script>

<style lang="less" scoped>
.home-group {
    ul {
        @media (min-width: 374px) {
            transform: translateX(-550px);
        }
        @media (min-width: 640px) {
            transform: translateX(-360px);
        }
        @media (min-width: 1024px) {
            transform: translateX(-290px);
        }
        @media (min-width: 1280px) {
            transform: translateX(-310px);
        }
        @media (min-width: 1680px) {
            transform: translateX(0px);
        }
    }
    .left {
        .img-box {
            @media (max-width: 639px) {
                height: 347px !important;
            }
        }
    }
    .right {
        .img-box {
            height: 413px;
            background: url('~@/assets/images/index/map.png') top -1px right / auto 113% no-repeat;
        }
    }
    .group-bottom {
        @media (max-width: 639px) {
            flex-direction: column;
            padding-left: 15px;
            padding-right: 15px;
        }

        > div {
            &:first-child {
                @media (max-width: 639px) {
                    margin-bottom: 15px;
                }
            }
        }
    }
}
</style>
