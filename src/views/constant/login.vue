<template>
  <div class="login-container flex-box flex_a_i-center flex_j_c-center">
    <el-card class="width-500">
      <el-form
        ref="refForm"
        :model="form"
        :rules="rules"
        @keyup.enter="submit()">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="账户" clearable>
            <template #prefix>
              <Iconfont name="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="密码"
            show-password
            clearable>
            <template #prefix>
              <Iconfont name="lock" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            class="flex-item_f-1"
            v-model="form.captcha"
            placeholder="验证码"
            clearable>
            <template #prefix>
              <Iconfont name="verification" />
            </template>
          </el-input>
          <img
            class="height-32 cursor-pointer"
            :src="captchaImg"
            @click="getCaptcha()"
            alt="验证码">
        </el-form-item>
        <el-button
          v-repeat
          :loading="loading"
          class="margin_t-20 width-full"
          type="primary"
          @click="submit()">登录</el-button>
      </el-form>
    </el-card>
    <!-- 多企业弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      title="选择企业"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-radio-group v-model="enterprise" class="ml-4">
          <el-radio :label="item.enterprise_id" v-for="(item, index) in enterpriseList" :key="index">
            {{item.user_role == 'ROLE_SYS_SUPER_ADMIN' ? '超级管理员' : item.enterprise_name}}
          </el-radio>
        </el-radio-group>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="doubleSubmit()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { useAdministratorStore } from '@stores/administrator'

import { ElNotification } from 'element-plus'

import { generateUUID, getApiBaseUrl } from '@/utils'

import { captchaApi } from '@/api/login'

import md5 from 'js-md5'

import { cloneDeep } from 'lodash'

const router = useRouter()
const administratorStore = useAdministratorStore()

const refForm = ref()
const loading = ref(false)
const captchaImg = ref('')
const dialogVisible = ref(false)
const enterpriseList = ref({})
const enterprise = ref()

const form = reactive({
  purpose: 'LOGIN',
  account: '',
  password: '',
  cipher: '',
  captcha: '',
  is_encrypted_password: false
})

const rules = reactive(function() {
  return {
    account: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }
}())

/**
 * @description: 获取验证码图片
 * @param {*}
 * @return {*}
 */
const getCaptcha = () => {
  // const uuid = generateUUID()
  // form.uuid = uuid
  const options = {
    height: 40,
    length: 4,
    width: 95
  }
  console.log(import.meta.env.VITE_BASE_API)
  captchaApi(options).then(r => {
    if (r.result === 'ok') {
      console.log(r)
      form.cipher = r.data.cipher
      captchaImg.value = 'data:image/jpeg;base64,' + r.data.image
      // captchaImg.value = import.meta.env.VITE_BASE_API + r.data.image
      console.log(form.cipher.value)
    }
  })
}

/**
 * @description: 二次企业登录表单提交
 * @return {*}
 */
const doubleSubmit = () => {
  const data = cloneDeep(form)
  data.password = md5(data.password)
  if (enterprise.value !== '') {
    data.enterprise_id = enterprise.value
  }
  loading.value = true
  administratorStore.doubleLoginApi(data).then(r => {
    if (r) {
      router.push({ name: 'redirect', replace: true })
      dialogVisible.value = false
      nextTick(() => {
        loading.value = false
      })
    } else {
      getCaptcha()
      nextTick(() => {
        data.loading = false
      })
    }
  })
}

/**
 * @description: 登录表单提交
 * @param {*}
 * @return {*}
 */
const submit = () => {
  refForm.value.validate(valid => {
    const data = cloneDeep(form)
    data.password = md5(data.password)
    if (valid) {
      loading.value = true
      administratorStore.login(data).then(r => {
        if (r.result === 'ok') {
          console.log(r)
          enterpriseList.value = r.data.login_options
          // 如果用户只有一个企业，直接省去二次登录
          enterpriseList.value = enterpriseList.value.filter((x) => typeof x.enterprise_id !== 'undefined')
          if (enterpriseList.value.length === 1) {
            enterprise.value = enterpriseList.value[0].enterprise_id
            doubleSubmit()
          } else {
            dialogVisible.value = true
          }
        } else {
          getCaptcha()
          nextTick(() => {
            data.loading = false
          })
        }
      })
    }
  })
}

/**
 * @description: 提示
 * @param {*}
 * @return {*}
 */
const notifyHandle = () => {
  const message = `
        <div class="login-notify-content">
          <div class="tip">演示环境，部分权限暂不开放</div>
          因系统禁止多点在线 所以会遇到token失效、退出登录的情况属，可以尝试更换帐号登录！
          <div class="margin_t-10">
            <p>总后台帐号：</p>
            <b>demo1，demo2，demo3，demo4</b>
          </div>
          <div class="margin-10-n">
            <p>企业超管帐号：</p>
            <b>admin1，admin2，admin3，admin4</b>
          </div>
          <p>所有帐号的密码统一为：<b>superadmin</b></p>
        </div>
      `
  ElNotification({
    title: '提示',
    dangerouslyUseHTMLString: true,
    message: message,
    type: 'warning',
    position: 'bottom-right',
    duration: 0,
    customClass: 'login-notify'
  })
}

onBeforeMount(() => {
  getCaptcha()
  // notifyHandle()
})
</script>

<style lang="scss">
.login-container {
  input:focus + .el-input__prefix {
    color: var(--el-color-primary);
  }
}
</style>

<style lang="scss">
.login-notify {
  width: 400px;
  .login-notify-content {
    position: relative;
    .tip {
      position: absolute;
      top: -30px;
      left: 40px;
      color: var(--el-color-warning);
    }
    & > div {
      p {
        // font-weight: 700;
        color: var(--el-color-primary);
      }
      b {
        text-indent: 2em;
      }
    }
    p > b {
      color: var(--el-color-danger);
    }
  }
}
</style>
