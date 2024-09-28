<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <footer class="site-footer">
        <div class="bg-primary-400 px-8 py-16 md:px-0" v-if="isShowEmail">
            <div class="mx-auto 2xl:max-w-8xl xl:max-w-6xl lg:max-w-3xl">
                <div class="dark-blue items-center 2xl:flex lg:block">
                    <ul class="w-full 2xl:w-10/12 lg:w-full grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
                        <li class="text-primary-200 pr-4" v-for="(item, index) in addresses" :key="index">
                            <span class="inline-block w-full pt-6 text-lg">{{ item.name }}</span>
                            <span class="inline-block w-full text-base">{{ item.tel }}</span>
                            <span class="inline-block w-full text-base">{{ item.address }}</span>
                        </li>
                    </ul>
                    <div class="links w-full 2xl:w-2/12 lg:w-full 2xl:flex lg:flex 2xl:items-end 2xl:flex-col lg:flex-row lg:justify-between">
                        <h3 class="leading-6 pt-6 text-primary-200 text-xl font-light">
                            <logoFooter></logoFooter>
                        </h3>
                        <div class="img-box mt-8">
                            <img class="w-28" :src="require('@/assets/images/common/wchat.png')" alt="" srcset="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-primary-500 text-sm py-4 text-center text-white">
            <span>COPYRIGHT @ {{ new Date().getFullYear() }} 良禾集团</span>
            <span class="pl-4">备案号：鲁ICP备19006139号-1</span>
        </div>
    </footer>
</template>
<script>
import logoFooter from '@/assets/images/common/logo-footer.svg'
export default {
    data() {
        return {
            isShowEmail: true
        }
    },
    watch: {
        $route: {
            handler(newV, oldV) {
                this.isShowEmail = newV.fullPath !== '/contact'
            },
            immediate: true
        }
    },
    computed: {
        addresses() {
            // 中文备份
            // return [
            //     {
            //         name: '中国青岛',
            //         tel: '+86 532 8099 9861',
            //         address: '青岛市香港东路 88 号海信国际中心 B 座 7 楼'
            //     },
            //     {
            //         name: '中国上海',
            //         tel: '+86 21 5820 8930',
            //         address: '上海市虹口区杨树浦路 248 号瑞丰国际大厦 1411 室'
            //     },
            //     {
            //         name: '中国香港',
            //         tel: '+852 6936 2815',
            //         address: '香港島金鐘夏愨道 16 號遠東金融中心 43 樓 06-07 室'
            //     },
            //     {
            //         name: '新加坡',
            //         tel: '+65 6970 2060',
            //         address: '新加坡珠烈街 65 号华侨银行大厦 49 层 07A 室'
            //     }
            // ]
            return [
                {
                    name: ' QINGDAO,CHINA',
                    tel: '+86 532 8099 9861',
                    address: '7F, BLOCK B, HISENSE INTERNATIONAL CENTER,NO.88 HONG KONG EAST ROAD, QINGDAO, CHINA'
                },
                {
                    name: 'HONG KONG, CHINA',
                    tel: '+852 6936 2815',
                    address: 'ROOM 06-07,43/F, FAR EAST FINANCE CENTRE, NO. 16 HARCOURT ROAD, ADMIRALTY, HONG KONG'
                },
                {
                    name: 'SHANGHAI，CHINA',
                    tel: '+86 21 5820 8930',
                    address: 'ROOM 1411, RUI FENG INT’L TOWER, NO.248 YANG SHU PU ROAD, HONGKOU DISTRICT, SHANGHAI, CHINA'
                },
                {
                    name: 'SINGAPORE',
                    tel: '+65 6970 2060',
                    address: '65 CHULIA STREET #49-07A OCBC CENTRE SINGAPORE 049513'
                }
            ]
        }
    },
    components: {
        logoFooter
    }
}
</script>
<style lang="less" scoped></style>
