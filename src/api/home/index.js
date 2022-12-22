/*
 * @Description: 首页
 * @Date: 2022-06-21 05:29:36

 * @LastEditTime: 2022-06-21 05:29:36
 */
import service from '@/utils/request'

/**
 * @description: 获取最近30天登录量
 * @param {*}
 * @return {*} */
export function visitsApi() {
  return service({
    url: '/admin/home/visits',
    method: 'get'
  })
}
