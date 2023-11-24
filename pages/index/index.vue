<template>
  <div class="content">
    <nuxt-img src="/img/people.png"/>
    <nuxt-icon name="youtube" filled/>
    <el-input v-model="name" />
    <el-button @click="submit">submit</el-button>
  </div>
</template>

<script lang="ts" setup>
const name = ref('')
const submit = () => {
  useHttpRequset('/api/test', {
    method: 'POST',
    body: {
      name: name.value
    }
  }).then(res => {
    console.log(res)
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>