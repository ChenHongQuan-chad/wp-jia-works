<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <el-menu :default-active="defaultAct" class="ch-menus" :mode="mode" :router="router" background-color="transparent" text-color="#fff" active-text-color="rgba(223, 91, 49,1)">
        <template v-for="(item, ind) in menuList">
            <el-submenu popper-class="ch-submenu" :ref="item.path" :index="item.path" v-if="item.children" :key="ind" :show-timeout="100">
                <template slot="title">
                    <span @click="handleClick(item)">{{ item.name }}</span>
                </template>
                <el-menu-item @click="handleClick(it)" :index="it.path" :key="i" v-for="(it, i) in item.children">{{ it.name }}</el-menu-item>
            </el-submenu>
            <el-menu-item @click="handleClick(item)" :ref="item.path" :index="item.path" v-else-if="item.id" :key="ind">{{ item.name }}</el-menu-item>
            <el-menu-item @click="handleClick(item)" :ref="item.path" :index="item.path" v-else-if="item.path" :key="ind">{{ item.name }}</el-menu-item>
        </template>
        <!--
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
    </el-menu>
</template>

<script>
import { scrollIntoView } from '@/utils'
export default {
    name: 'ChMenus',
    props: {
        menuList: {
            type: Array,
            default: () => []
        },
        defaultAct: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: 'horizontal' //	horizontal / vertical
        },
        router: {
            type: Boolean,
            default: false
        }
    },
    computed: {},
    data() {
        return {}
    },
    methods: {
        handleClick(item) {
            console.log(item, '')
            this.$emit('click-menu', item.path)
            if (item.id) {
                this.$router.push(item.path).then(() => {
                    this.$nextTick(() => {
                        let el = document.getElementById(item.id)
                        if (el) {
                            scrollIntoView(el)
                        }
                    })
                })
            } else {
                this.$router.push(item.path)
            }
        }
    }
}
</script>

<style lang="less">
.ch-menus {
    background-color: transparent;
    .el-dropdown-menu__item,
    .el-menu-item {
        font-size: 1.25rem;
        &.is-active {
            border-bottom: none !important;
        }
    }
    .el-submenu {
        .el-submenu__title,
        .el-submenu__icon-arrow {
            font-size: 1.25rem;
        }
        .el-submenu__title {
            background-color: transparent !important;
            i {
                color: inherit;
            }
        }
    }
    &.el-menu--horizontal {
        border-bottom: none;
        width: max-content;
        & > .el-menu-item,
        & > .el-submenu .el-submenu__title {
            height: 80px;
            line-height: 80px;
        }
        & > .el-submenu .el-submenu__title {
            height: 77px;
            line-height: 77px;
        }
    }
}
.ch-submenu {
    background-color: rgba(0, 62, 160, 0.7);
    &.el-menu--horizontal {
        .el-menu {
            .el-menu-item,
            .el-submenu__title {
                height: 46px;
                line-height: 46px;
                font-size: 1rem;
            }
        }
    }
}
.el-menu--horizontal {
    .el-menu-item {
        &:not(.is-disabled):focus,
        &:not(.is-disabled):hover {
            background-color: transparent !important;
        }
    }
}
</style>
