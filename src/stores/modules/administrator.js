import { defineStore } from 'pinia'

import { clearJson } from '@/utils/index'
import { clearToken, getToken, setToken } from '@/utils/storage'
import { loginApi, logoutApi, doubleLoginApi } from '@/api/login'
import { selfInfoApi } from '@/api/administrator'

export const useAdministratorStore = defineStore('administrator', {
  state: () => ({
    administrator: {
      id: '',
      username: '',
      nickname: '',
      avatar: '',
      mobile: '',
      email: '',
      status: '',
      roles: [],
      supervisor: '',
      enterprise_id: ''
    },
    token: getToken()
  }),
  getters: {
    tokenVal: state => {
      return state.token.token
    }
  },
  actions: {
    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async login(params) {
      const r = await loginApi(params)
      if (r) {
        setToken(JSON.stringify(r.data))
        this.token = r.data
      }
      return r
    },
    /**
     * 二次登录
     * @param {*} params
     * @returns
     */
    async doubleLoginApi(params) {
      const r = await doubleLoginApi(params)
      if (r) {
        console.log(r)
        setToken(JSON.stringify(r.data))
        this.token = r.data
        this.administrator.id = r.data.user.id
      }
      return r
    },
    /**
     * 获取当前用户信息
     * @returns
     */
    async getAdministrator() {
      const params = {
        roleId: this.administrator.id
      }
      const r = await selfInfoApi(params)
      console.log(r)
      if (r) {
        this.administrator = r.data
      }
      return r
    },
    /**
     * 退出当前账户
     * @returns
     */
    async logout() {
      const r = await logoutApi()
      return r
    },
    /**
     * 清除登录用户信息
     */
    clearAdministrator() {
      clearJson(this.administrator)
    },
    /**
     * 清除登录用户凭证
     */
    clearToken() {
      clearJson(this.token)
      clearToken()
    }
  }
})
