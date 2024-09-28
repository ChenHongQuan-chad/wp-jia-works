<!--
 * @Description: 轮播卡片
 * @Author: chad-Chen
-->
<template>
    <div class="bda-swiper-box">
        <swiper
            @mouseenter.native="mySwiper.autoplay.stop()"
            @mouseleave.native="mySwiper.autoplay.start()"
            class="bda-swiper"
            ref="bdaSwiper"
            v-if="swiperList.length > 0"
            :options="finalOpt"
            :class="{ 'bda-swiper-liner': parseInt(delay) === 0 }"
        >
            <template v-for="(item, index) in swiperList">
                <swiper-slide :key="index" :data-id="index">
                    <slot :item="item" :index="index"></slot>
                </swiper-slide>
            </template>
            <div class="swiper-pagination" slot="pagination" v-if="finalOpt.pagination"></div>
            <div class="swiper-button-prev" slot="button-prev" v-if="finalOpt.navigation"></div>
            <div class="swiper-button-next" slot="button-next" v-if="finalOpt.navigation"></div>
        </swiper>
        <ch-empty v-else></ch-empty>
    </div>
</template>

<script>
import chEmpty from '@/components/common/ch-empty.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
const defaultOpt = {
    direction: 'vertical',
    spaceBetween: 0,
    // height: 360, //你的slide高度,vertical必须设置
    shortSwipes: true, // 默认允许短滑动
    grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
    observeParents: true, //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeSlideChildren: true, //解决autoHeight失效问题！
    // threshold: 20, //拖拽一定距离才会滑到一下slide,建议关闭，否则会卡顿
    paginationClickable: false, //是否可点击
    slidesPerView: '1',
    // slidesPerView: 1.6, // 如果slider设置定宽，可设置小数，去适配定宽
    centeredSlides: false, //激活的slide居中
    // centeredSlidesBounds: true, //影响center,注意
    loop: true,
    // loopedSlides: 1, // 没设置swiper-container宽度，需设置该项，否则宽度一直增加
    speed: 1000, //控制轮播的速度,平滑滚动
    autoplay: {
        disableOnInteraction: false, //解决手触摸之后，不滚动的问题
        // delay: 0, //每循环一圈，间隔时间，无缝轮询，则为0
        loopPreventsSlide: true
    },
    freeMode: false, //自由滑动,设置成true，滚动平滑
    // effect: 'coverflow', //折叠卡片
    // initialSlide: 1, //初始化显示第二个，修复默认第一个左侧的空白
    // coverflowEffect: {
    // 	rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
    // 	stretch: 10, //每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
    // 	depth: 160, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
    // 	modifier: 2, //depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
    // 	slideShadows: true //开启slide阴影。默认 true。
    // } // 如果需要前进后退按钮
    // scrollbar: {
    // 	el: '.swiper-scrollbar'
    // }
    // slideToClickedSlide: true, //点击的居中
    // centeredSlides: true, //居中展示
    initialSlide: 0 //默认就是0
}
let pagination = {
    el: '.swiper-pagination'
}
let navigation = {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
}
// let coverflowEffect = {
//     rotate: 50,
//     stretch: 0,
//     depth: 100,
//     modifier: 2,
//     slideShadows: true
// }
export default {
    name: 'bda-swiper',
    props: {
        /**
         * swiper列表
         */
        swiperList: {
            type: Array,
            default: () => []
        },
        /**
         * 展示几条
         */
        slidesPerView: {
            type: String,
            default: '1'
        },
        /**
         * 间隔
         */
        spaceBetween: {
            type: Number,
            default: 0
        },
        /**
         * 轮询方向
         */
        direction: {
            type: String,
            default: 'horizontal' //horizontal|vertical
        },
        /**
         * 是否展示page
         */
        showPagination: {
            type: Boolean,
            default: true
        },
        /**
         * 是否展示左右箭头
         */
        showNavigation: {
            type: Boolean,
            default: true
        },
        /**
         * 是否循环
         */
        loop: {
            type: Boolean,
            default: false
        },
        /**
         * 过度周期
         */
        speed: {
            type: Number,
            default: 1000
        },
        /**
         * 每循环一圈，间隔时间，无缝轮询，则为0
         */
        delay: {
            type: Number,
            default: 3000
        },

        option: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {}
    },
    computed: {
        finalOpt() {
            let calcOpt = {
                ...defaultOpt,
                ...this.option
            }
            return {
                ...calcOpt,
                direction: this.direction,
                loop: this.loop,
                speed: this.speed,
                slidesPerView: this.slidesPerView,
                spaceBetween: this.spaceBetween,
                autoplay: {
                    ...calcOpt.autoplay,
                    delay: this.delay
                },
                ...(this.showPagination ? { pagination } : {}),
                ...(this.showNavigation ? { navigation } : {})
            }
        },
        mySwiper() {
            return this.$refs.bdaSwiper.$swiper
        }
    },
    components: {
        chEmpty,
        Swiper,
        SwiperSlide
    },
    methods: {
        swiperTo(index) {
            if (this.mySwiper) {
                //通过指令获取实例
                this.mySwiper.slideTo(index, 1000, false)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.bda-swiper-box {
    height: inherit;
    min-height: 160px;
}
/deep/.bda-swiper-liner {
    .swiper-wrapper {
        transition-timing-function: linear !important;
    }
}
.swiper-button-prev,
.swiper-button-next {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    // border: 2px solid;
    @media (max-width: 640px) {
        width: 40px;
        height: 40px;
    }
}
.swiper-button-next::after,
.swiper-button-prev::after {
    font-size: 36px;
    @media (max-width: 640px) {
        font-size: 18px;
    }
}
// .swiper-button-next::after,
// .swiper-button-prev::after {
//     content: '';
//     width: 80px;
//     height: 80px;
//     background-size: contain;
// }
// .swiper-button-prev {
//     &::after {
//         background-image: url('~@/assets/images/common/up.png');
//     }
// }
// .swiper-button-next {
//     &::after {
//         background-image: url('~@/assets/images/common/down.png');
//     }
// }
</style>
