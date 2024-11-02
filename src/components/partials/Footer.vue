<!--
 * @Description:
 * @Author: Chad-Chen
-->

<template>
    <footer class="site-footer bg-gray-200 text-center">
        <img
            class="2xl:w-28 lg:w-24 inline-block"
            :src="require('@/assets/images/common/logo.png')"
            alt="jiaworks"
            srcset=""
        />
        <div class="text-sm py-4">
            <span>COPYRIGHT @ {{ new Date().getFullYear() }} JiaWorks</span>
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
                    address:
                        'ROOM 1411, RUI FENG INT’L TOWER, NO.248 YANG SHU PU ROAD, HONGKOU DISTRICT, SHANGHAI, CHINA'
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
