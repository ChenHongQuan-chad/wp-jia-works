<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <div class="home-icons md:px-0 grid sm:grid-cols-4 xs:grid-cols-2 gap-4" data-aos="fade-up" data-aos-duration="1100" :data-aos-delay="0">
        <div
            class="icon 2xl:py-8 lg:py-4 xs:py-4 transition-all bg-primary-100 cursor-pointer focus:underline focus:bg-white hover:bg-white"
            v-for="(item, index) in list"
            :key="index"
            @click="$router.push(item.link)"
        >
            <div class="img-icon lg:w-28 xs:w-32 mx-auto" data-aos="fade-up" data-aos-duration="1100" :data-aos-delay="(index + 1) * 300">
                <img class="object-fill w-full" :src="item.icon" :alt="item.alt" srcset="" />
            </div>
            <h2 class="title text-xl mt-4 flex flex-col items-center font-normal" data-aos="fade-up" data-aos-duration="1100" :data-aos-delay="(index + 1) * 400">
                <!-- 支持‘\n’换行 -->
                <span v-for="(it, index) in item.name.split(/\\n/)" :key="index">{{ it }}</span>
            </h2>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="less" scoped>
.home-icons {
    .icon {
        &:hover,
        &:focus,
        &:active {
            img {
                animation: trans-scale 3000ms linear infinite;
            }
        }
    }
}
</style>
