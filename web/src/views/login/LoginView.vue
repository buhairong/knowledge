<script setup lang="ts">
import type { Login } from '@/types'
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { User as UserIcon, Lock } from '@element-plus/icons-vue'
import { useUserStore } from "@/store/user";
import { signin } from '@/api/login'

const form = reactive<Login>({
  username: '',
  password: '',
})
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<Login>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
})

const router = useRouter()
const store = useUserStore()

const onSubmit = async () => {
  if (formRef.value) {
    await formRef.value.validate(async (valid) => {
      if (valid) {
        const { username, password } = form
        const res = await signin(username, password)
        if (res.code === 0) {
          store.$patch({
            token: res.access_token,
          })
          router.push("/home")
        } else {
          ElMessage.error(res.message)
        }
      }
    })
  }
}
</script>

<template>
  <div class="wrap">
    <el-form :model="form" ref="formRef" :rules="rules">
      <div class="title">请登录</div>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username" :prefix-icon="UserIcon" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" placeholder="请输入密码" show-password v-model="form.password" :prefix-icon="Lock" />
      </el-form-item>

      <el-form-item style="margin-bottom: 0;">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/src/assets/imgs/login_bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  .el-form {
    width: 500px;
    padding: 20px 20px 40px;
    box-shadow: 0px -2px 32px rgba(10, 15, 45, 0.02), 0px 4px 24px rgba(10, 15, 45, 0.04);
	  border-radius: 12px;
    background: #fff;
    .title {
      margin: 0 auto 20px;
      width: 200px;
      height: 44px;
      line-height: 44px;
      font-size: 20px;
      color: #79bbff;
      text-align: center;
      border-bottom: 1px solid #337ecc;
    }
    .el-button {
      width: 100%;
    }
  }
  
}
</style>
