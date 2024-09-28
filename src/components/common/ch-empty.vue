<template>
    <div class="ch-empty" :style="computedStyle">
        {{text}}
    </div>
</template>

<script>
    export default {
        name:'ch-empty',
        props: {
            text: {
                type: String,
                default: '暂无数据'
            },
             width:{
                type:[Number,String],
                default:'100%'
            },
            height:{
                type:[Number,String],
                default:300
            }

        },
        computed: {
            computedStyle() {
                return {
                    width:typeof this.width === 'number'?`${this.width}px`:this.width,
                    height:typeof this.height === 'number'?`${this.height}px`:this.height
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .ch-empty{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
