<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <chScroll ref="scrollPane" class="tags-view-wrapper">
        <Menus :menuList="menuList" :defaultAct="defaultAct" v-bind="$attrs" v-on="$listeners" />
    </chScroll>
</template>

<script>
import Menus from './menus.vue'
import chScroll from '@/components/common/ch-scroll'
export default {
    props: {
        menuList: {
            type: Array,
            default: () => []
        },
        defaultAct: {
            type: String,
            default: ''
        }
    },
    watch: {
        'menuList.length': {
            handler(newV) {
                if (newV > 0) {
                    this.moveToCurrentPath()
                }
            },
            immediate: true
        }
    },
    methods: {
        moveToCurrentPath() {
            let parPath = this.getParentMenu(this.menuList)
            if (parPath) {
                this.$nextTick(() => {
                    this.$refs.scrollPane?.moveToTarget(parPath)
                })
            }
        },
        getParentMenu(menuList, par) {
            let findRes = menuList.find(item => item.path === this.defaultAct)
            if (findRes) {
                return par?.path || findRes.path
            } else {
                for (const item of menuList) {
                    if (item.hasChildren) {
                        return this.getParentMenu(item.children, item)
                    }
                }
            }
        }
    },
    components: {
        Menus,
        chScroll
    }
}
</script>

<style lang="scss" scoped></style>
