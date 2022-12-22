/*
 * @Description: 操作日志
 * @Date: 2020-12-28 16:25:18

 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 当前管理员 分页
 * @param {*}
 * @return {*} */
export function selfPageApi(params) {
  return service({
    url: '/admin/log/operation/self/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 分页
 * @param {*}
 * @return {*} */
export function pageApi(params) {
  return service({
    url: '/admin/log/operation/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 删除 所有日志
 * @param {*}
 * @return {*} */
export function deleteApi() {
  return service({
    url: `/admin/log/operation/delete`,
    method: 'post'
  })
}

// todo:------------------------------------------------------------------------------------

/**
 * @description: 企业ID 企业下所有操作日志分页
 * @param {*}
 * @return {*} */
export function globalPageApi(params) {
  return service({
    url: '/admin/log/operation/global/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 企业ID 删除企业下所有日志
 * @param {*}
 * @return {*} */
export function globalDeleteApi(params) {
  return service({
    url: `/admin/log/operation/global/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 清空所有企业日志
 * @param {*}
 * @return {*} */
export function globalTruncateApi() {
  return service({
    url: `/admin/log/operation/global/truncate`,
    method: 'post'
  })
}
