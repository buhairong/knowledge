<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div class="common-layout">
    <el-container class="is-vertical">
      <Header />
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>

</style>
