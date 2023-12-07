<script setup lang="ts">
import { changeTheme } from '@/utils/util'

const defaultTheme = '#409EFF'
const handleTheme = () => {
  const theme = localStorage.getItem('themeColor') || defaultTheme
  changeTheme(theme)
}

// handleTheme()

</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
