/*
 * @Description: 异常日志
 * @Date: 2020-12-28 16:25:18

 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 分页
 * @param {*}
 * @return {*} */
export function pageApi(params) {
  return service({
    url: '/admin/log/error/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*} */
export function infoApi(params) {
  return service({
    url: `/admin/log/error/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 删除 所有日志
 * @param {*}
 * @return {*} */
export function deleteApi() {
  return service({
    url: `/admin/log/error/delete`,
    method: 'post'
  })
}

/**
 * @description: 清空所有企业日志
 * @param {*}
 * @return {*} */
export function truncateApi() {
  return service({
    url: `/admin/log/error/truncate`,
    method: 'post'
  })
}
