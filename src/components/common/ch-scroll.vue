<!--
 * @Description:
 * @Author: Chad-Chen
-->
<template>
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
        <slot />
    </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4 // tagAndTagSpacing

export default {
    name: 'ScrollPane',
    data() {
        return {
            left: 0
        }
    },
    computed: {
        scrollWrapper() {
            return this.$refs.scrollContainer.$refs.wrap
        }
    },
    mounted() {
        this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
    },
    beforeDestroy() {
        this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
    },
    methods: {
        // 鼠标滚动触发菜单滚动
        handleScroll(e) {
            const eventDelta = e.wheelDelta || -e.deltaY * 40
            const $scrollWrapper = this.scrollWrapper
            $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
        },
        // 外侧触发事件，比如关闭弹窗等
        emitScroll() {
            this.$emit('scroll')
        },
        // 滚的到某个tag
        moveToTarget(parPath) {
            // 测试MenuPath:'29','7','20','23'
            // parPath = '29' //TODO
            let menuComRef = this.$refs.scrollContainer?.$children[0]
            console.log(menuComRef, 'menuComRef')
            let menuRef = menuComRef.$refs[parPath]
            if (menuRef.length > 0) {
                let menuDom = menuRef[0].$el
                let fullWidth = menuDom.offsetLeft + menuDom.offsetWidth
                // console.log(menuDom.offsetLeft, 'offsetLeft')
                // console.log(menuDom.offsetWidth, 'offsetWidth')
                // console.log(fullWidth, 'fullWidth')
                const $containerWidth = this.$refs.scrollContainer.$el.offsetWidth
                // this.scrollWrapper.scrollLeft = this.scrollWrapper.scrollWidth - fullWidth
                this.scrollWrapper.scrollLeft = fullWidth - $containerWidth > 0 ? fullWidth - $containerWidth : 0 //如左侧的宽度>视窗宽度，则左移，否则不移动
            }
        }
    }
}
</script>

<style lang="less" scoped>
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    ::v-deep {
        .el-scrollbar__bar {
            bottom: 0px;
        }
        .el-scrollbar__wrap {
            overflow-y: hidden;
        }
        .el-scrollbar__wrap,
        .el-scrollbar__view {
            height: auto;
        }
    }
}
</style>
