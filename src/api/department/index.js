/*
 * @Description: 部门
 * @Date: 2022-08-08 05:22:22

 * @LastEditTime: 2022-08-08 05:22:22
 */
import service from '@/utils/request'

/**
 * @description: 列表
 * @param {*}
 * @return {*} */
export function listApi(params) {
  return service({
    url: '/admin/department/list',
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
    url: `/admin/department/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*} */
export function addApi(params) {
  return service({
    url: '/admin/department/create',
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
    url: '/admin/department/update',
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
    url: '/admin/department/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 状态切换
 * @param {*} params
 * @return {*} */
export function statusApi(params) {
  return service({
    url: '/admin/department/status',
    method: 'post',
    data: params
  })
}

/**
 * @description: 部门列表
 * @param {*}
 * @return {*} */
export function selectListApi(params) {
  return service({
    url: '/admin/department/select/list',
    method: 'get',
    params: params
  })
}

// todo:------------------------------------------------------------------------------------

/**
 * @description: 部门列表
 * @param {*}
 * @return {*} */
export function globalSelectListApi(params) {
  return service({
    url: '/admin/department/global/select/list',
    method: 'get',
    params: params
  })
}
