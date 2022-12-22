/*
 * @Description: 企业
 * @Date: 2020-12-28 16:25:18

 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 获取当前管理员所在企业
 * @param {*}
 * @return {*} */
export function selfInfoApi() {
  return service({
    url: '/admin/enterprise/self/info',
    method: 'get'
  })
}

/**
 * @description: 分页
 * @param {*}
 * @return {*} */
export function pageApi(params) {
  return service({
    url: '/admin/enterprise/page',
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
    url: `/admin/enterprise/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*} */
export function addApi(params) {
  return service({
    url: `/admin/enterprise/create`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*}
 * @return {*} */
export function editApi(params) {
  return service({
    url: `/admin/enterprise/update`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*} */
export function deleteApi(params) {
  return service({
    url: `/admin/enterprise/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 设置是否启用
 * @param {*}
 * @return {*} */
export function setStatusApi(params) {
  return service({
    url: `/admin/enterprise/status`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 分页-精简信息 只有 id name 字段
 * @param {*}
 * @return {*} */
export function pageSimplifyApi(params) {
  return service({
    url: '/admin/enterprise/global/page',
    method: 'get',
    params: params
  })
}
