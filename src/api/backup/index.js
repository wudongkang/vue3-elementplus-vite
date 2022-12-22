/*
 * @Description: 备份
 * @Date: 2022-06-17 04:43:51

 * @LastEditTime: 2022-06-17 04:43:51
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*} */
export function pageApi(params) {
  return service({
    url: '/admin/backup/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 备份
 * @param {*}
 * @return {*} */
export function backupApi() {
  return service({
    url: '/admin/backup/backup',
    method: 'post'
  })
}

/**
 * @description: 恢复
 * @param {*}
 * @return {*} */
export function recoveryApi(params) {
  return service({
    url: '/admin/backup/recovery',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*} */
export function delApi(params) {
  return service({
    url: '/admin/backup/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 更新配置
 * @param {*}
 * @return {*}
*/
export function updateConfigApi(params) {
  return service({
    url: '/admin/backup/update/config',
    method: 'post',
    data: params
  })
}
