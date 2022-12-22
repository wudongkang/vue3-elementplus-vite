/*
 * @Description: 登录
 * @Date: 2020-12-28 16:25:18

 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'
import { parseJson2Param } from '@/utils/index'
import { getApiBaseUrl } from '@/utils'

/**
 * @description: 验证码
 * @param {*} params
 * @return {*} */
export function captchaApi(params) {
  // let result = ''
  // const options = {
  //   url: 'admin/captcha.jpeg',
  //   method: 'post',
  //   params: params
  // }
  // result = `${ getApiBaseUrl(import.meta.env) + options.url }?${ parseJson2Param(options.params) }`
  // return result

  return service({
    url: '/ucsys/common/api/v1/auth/get_login_captcha',
    method: 'post',
    data: params
  })
}

/**
 * @description: 登录
 * @param {*} params
 * @return {*} */
export function loginApi(params) {
  return service({
    url: '/ucsys/common/api/v1/auth/list_login_options',
    method: 'post',
    data: params
  })
}

/**
 * @description: 二次登录
 * @param {*} params
 * @return {*} */
export function doubleLoginApi(params) {
  return service({
    url: '/ucsys/enterprise_admin/api/v1/enterprise_user_management/login',
    method: 'post',
    data: params
  })
}

/**
 * @description: 退出
 * @param {*}
 * @return {*} */
export function logoutApi() {
  return service({
    url: '/admin/logout',
    method: 'post'
  })
}
