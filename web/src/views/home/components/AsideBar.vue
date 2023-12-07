<script setup lang="ts">
import { ref } from 'vue'
import { useMenuStore } from "@/store/menu"

const store = useMenuStore()
const activeMenuUrl = ref(store.activeMenuUrl)
const menus = store.menus

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  store.setActiveMenuUrl(key)
}

</script>

<template>
  <el-aside>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active="activeMenuUrl"
      text-color="#fff"
      router
      @select="handleSelect"
    >
      <el-menu-item index="/home/index">
        <el-icon><Menu /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item 
        v-for="item in menus"
        :key="item.id"
        :index="item.route"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.menuName }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  width: var(--aside-width);
  .el-menu-vertical-demo {
    height: 100%;
  }
}
</style>
