<!--
 * @Description:
 * @Date: 2022-03-07 11:02:15

 * @LastEditTime: 2022-03-07 11:18:16
-->
<template>
  <i class="iconfont" :style="style" :class="`icon-${name}`" />
</template>
<!--
 * 使用:
 *   1.组件模版中使用
 *      [<g-icon name="name" size="size" color="color"></g-icon>]
 * 注意:
 *    1.name      为 阿里图库图标名称 不包括前面的 icon-（必填）
 *    2.size      大小 font-size
 *    3.color     颜色
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: () => '14px'
  },
  color: {
    type: String,
    default: ''
  }
})

const style = computed(() => {
  return {
    'font-size': props.size,
    color: props.color
  }
})
</script>

<style lang="scss" scoped>
@import '//at.alicdn.com/t/c/font_3225946_j1j10aooqn.css';
</style>
