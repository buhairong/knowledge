<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/store/user"
import Logo from '@/assets/imgs/logo.png'
import Avatar from '@/assets/imgs/avatar.png'
import { Lock } from '@element-plus/icons-vue'
import { ChangePwd } from "@/types"
import { FormInstance, FormRules } from "element-plus"
import { updatePassword } from '@/api/user'

const router = useRouter()
const store = useUserStore()
const userInfo = ref(store.userInfo)

let timer: NodeJS.Timeout | null = null
const showUserCenter = ref(false)

const openUserCenter = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  showUserCenter.value = true
}

const closeUserCenter = () => {
  timer = setTimeout(() => {
    showUserCenter.value = false
  }, 200)
}

const showChangePsdDialog = ref(false)
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<ChangePwd>>({
  oldPassWord: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassWord: [
    { required: true, message: '请输入新密码', trigger: 'blur' }
  ],
})

const changePsdForm = reactive<ChangePwd>({
  oldPassWord: '',
  newPassWord: ''
})

const openChangePsdDialog = () => {
  showChangePsdDialog.value = true
}

const closeChangePsdDialog = () => {
  changePsdForm.oldPassWord = ''
  changePsdForm.newPassWord = ''
  showChangePsdDialog.value = false
}

const changePsd = async () => {
  if (formRef.value) {
    await formRef.value.validate(async (valid) => {
      if (valid) {
        const { oldPassWord, newPassWord } = changePsdForm
        const res = await updatePassword(userInfo.value.userId as number, oldPassWord, newPassWord)
        if (res.code === 0) {
          closeChangePsdDialog()
          ElMessage.success('密码修改成功')
        } else {
          ElMessage.error(res.message)
        }
      }
    })
  }
}

const showThemeDialog = ref(false)
const openThemeDialog = () => {
  showThemeDialog.value = true
}

const quitloging = () => {
  store.logout()
  router.replace("/login")
}
</script>

<template>
  <el-header>
    <div class="logo-wrap">
      <el-image style="height: 100%;" :src="Logo" />
    </div>
    <div class="container">
      <div class="left">KNOWLEDGE后台管理</div>
      <div class="right" @mouseenter="openUserCenter" @mouseleave="closeUserCenter">
        <div class="nickname">{{ userInfo.nickname }}</div>
        <el-image style="width: 32px;" :src="Avatar" />
        <div class="user-center" @mouseenter="openUserCenter" @mouseleave="closeUserCenter" v-show="showUserCenter">
          <div class="userinfo">
            <div class="username">{{ userInfo.nickname }}</div>
            <div>{{ userInfo.username }}</div>
          </div>
          <div class="role-list">
            超级管理员
          </div>
          <div class="line"></div>
          <!-- <div class="link-btn" @click="openThemeDialog">编辑主题</div> -->
          <div class="link-btn" @click="openChangePsdDialog">修改密码</div>
          <div class="link-btn" @click="quitloging()">退出登录</div>
        </div>
      </div>
    </div>
  </el-header>

  <el-dialog v-model="showChangePsdDialog" title="修改密码">
    <el-form :model="changePsdForm" ref="formRef" :rules="rules">
      <el-form-item prop="oldPassWord">
        <el-input type="password" placeholder="请输入原密码" show-password v-model="changePsdForm.oldPassWord" :prefix-icon="Lock" autocomplete="new-password" />
      </el-form-item>
      <el-form-item prop="newPassWord">
        <el-input type="password" placeholder="请输入新密码" show-password v-model="changePsdForm.newPassWord" :prefix-icon="Lock" autocomplete="new-password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChangePsdDialog">取消</el-button>
        <el-button type="primary" @click="changePsd">确认修改</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="showThemeDialog" title="修改主题色">
    <el-form :model="changePsdForm" ref="formRef" :rules="rules">
      <el-form-item prop="oldPassWord">
        <el-input type="password" placeholder="请输入原密码" show-password v-model="changePsdForm.oldPassWord" :prefix-icon="Lock" autocomplete="new-password" />
      </el-form-item>
      <el-form-item prop="newPassWord">
        <el-input type="password" placeholder="请输入新密码" show-password v-model="changePsdForm.newPassWord" :prefix-icon="Lock" autocomplete="new-password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChangePsdDialog">取消</el-button>
        <el-button type="primary" @click="changePsd">确认修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  display: flex;
  .logo-wrap {
    width: var(--aside-width);
    height: var(--header-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    padding: 0 60px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 20px;
      font-weight: 500;
    }
    .right {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      .nickname {
        padding-right: 12px;
      }
      .user-center {
        padding: 20px;
        position: absolute;
        top: 45px;
        right: -30px;
        z-index: 100;
        width: 300px;
        border-radius: 4px;
        background: #FFFFFF;
        border: 1px solid #E5E6EB;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
        .userinfo {
          display: flex;
          align-items: center;
          height: 24px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #86909C;
          .username {
            font-size: 16px;
            font-family: PingFangSC-Medium;
            color: #1D2129;
            padding-right: 8px;
          }
        }
        .role-list {
          margin-top: 6px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          line-height: 18px;
          color: #86909C;
        }
        .line {
          margin: 16px 0;
          width: 100%;
          height: 1px;
          background: #F2F3F5;
        }
        .link-btn {
          margin-bottom: 16px;
          height: 20px;
          line-height: 20px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #1D2129;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
