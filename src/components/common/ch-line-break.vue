<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <div class="ch-line-break">
        <!-- 支持‘\n’换行 -->
        <span v-for="(it, index) in textArr" :key="index">{{ it }}</span>
    </div>
</template>

<script>
export default {
    name: 'ch-line-break',
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    computed: {
        textArr() {
            let textArr = this.text.split(/(\\n|\/n)/).filter(item => !/(\\n|\/n)/.test(item))
            return textArr
        }
    }
}
</script>

<style lang="less" scoped>
.ch-line-break {
    display: flex;
    flex-direction: column;
}
</style>
