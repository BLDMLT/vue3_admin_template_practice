<template>
  <div class="login_container">
    <el-row>
      <!-- xs是小于768 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>Welcome to John's Vue System</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              login
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 获取时间函数
import { getTime } from '@/utils/time'
// 引入用户相关小仓库
import useUserStore from '@/store/modules/user'

let useStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
// 控制按钮加载
let loading = ref(false)
// 获取form
let loginForms = ref()
// 收集数据
let loginForm = reactive({ username: 'admin', password: '111111' }) // 类似 useState, useReducer
// 回调登录按钮
const login = async () => {
  // 保证表单校验通过
  await loginForms.value.validate()
  //开始加载
  loading.value = true
  //通知仓库发请求
  //成功=> 进首页
  // 失败=> error msg
  try {
    // 保证登录成功
    await useStore.userLogin(loginForm)
    // 判断路径是否有query 有-> 跳query，没有-> 跳home
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi, ${getTime()}好`,
    })

    loading.value = false
  } catch (error) {
    loading.value = false
    // 登录失败
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
// 自定义校验规则函数
// rule: 校验规则
// value: 表单文本内容
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}

const rules = {
  username: [
    // {required: true, message: '用户名不能为空', trigger: 'blur'},
    // {required: true, min: 6, max: 10, message: '长度至少六位', trigger: 'change'}
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // {required: true, min: 6, max: 15, message: '密码的长度至少六位', trigger: 'change'}
    { trigger: 'change', validator: validatorPassword },
  ],
}
getTime()
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh; // 高度要撑开
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover; // 大小覆盖
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
