<script setup lang="ts">
import Header from './components/Header.vue'
import AsideBar from './components/AsideBar.vue'
</script>

<template>
  <div class="common-layout">
    <el-container class="is-vertical out-container">
      <Header />
      <el-container>
        <AsideBar />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-main {
  background-color: #e9eef3;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
}
</style>
