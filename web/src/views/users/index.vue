<script setup lang="ts">
import type { User, Role } from '@/types'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllUsers, removeUser } from '@/api/user'

const currentPage = ref(1)
const total = ref(0)
const tableData = ref<Partial<User>[]>([{}])
const getUsers = async () => {
  const params = {
    page: currentPage.value,
    limit: 10
  }
  const res = await getAllUsers(params)
  if (res.code === 0) {
    total.value = res.data.total
    tableData.value = res.data.records
  }
}
getUsers()
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getUsers()
}

const setUser = (type: number, row?: Partial<User>) => {

}

const deleteUser = (row: Partial<User>) => {
  ElMessageBox.confirm(
    `确定要删除用户 ${row.nickname} 吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    const res = await removeUser(row.id as number)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.message,
      })
      getUsers()
    } else {
      ElMessage({
        type: 'error',
        message: res.message,
      })
    }
  })
}
</script>

<template>
  <div class="page-wrap">
    <div class="add-btn-wrap">
      <el-button
        type="primary"
        @click.prevent="setUser(1)"
      >
        增加用户
      </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="roles" label="角色" >
        <template #default="scope">
          <div v-if="scope.row.roles">{{ scope.row.roles.map((role: Role) => role.roleName).join('、') }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="openid" label="openid" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="最后更新时间" />
      <el-table-column prop="lastLoginTime" label="上次登录时间" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click.prevent="setUser(2, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click.prevent="deleteUser(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-wrap">
      <el-pagination hide-on-single-page background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
