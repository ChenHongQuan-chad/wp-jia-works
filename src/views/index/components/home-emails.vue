<!--
 * @Description: 邮箱地址
 * @Author: Chad-Chen
-->

<template>
    <ul class="home-emails w-full">
        <li class="text-2xl text-gray-100">{{ content.email_text }}</li>
        <li
            class="text-lg mt-4 text-gray-400 transition-all hover:text-gray-200 sm:flex sm:flex-row xs:flex xs:flex-col"
            v-for="(item, index) in content.single_email"
            :key="index"
        >
            <span>{{ item.name }}</span>
            <span class="sm:pl-16 xs:pl-0">{{ item.address }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        content: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style lang="less" scoped></style>
