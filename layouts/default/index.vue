<template>
    <div>
        <AppHeader />
        <NuxtLoadingIndicator/>
        <slot />
        <AppFooter />
    </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>