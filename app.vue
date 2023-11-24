<template>
  <NuxtLayout>
    <el-config-provider :locale="zhCn">
      <NuxtPage/>
    </el-config-provider>
  </NuxtLayout>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style lang="scss">
</style>