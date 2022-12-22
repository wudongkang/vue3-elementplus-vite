/*
 * @Description: 系统配置
 * @Date: 2022-06-17 03:09:3
 * @LastEditTime: 2022-06-17 03:09:33
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*} */
export function pageApi(params) {
  return service({
    url: '/admin/configuration/page',
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
    url: `/admin/configuration/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*} */
export function addApi(params) {
  return service({
    url: '/admin/configuration/create',
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
    url: '/admin/configuration/update',
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
    url: '/admin/configuration/delete',
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
    url: '/admin/configuration/status',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编码查询列表
 * @param {*}
 * @return {*} */
export function listApi(params) {
  return service({
    url: `/admin/configuration/list/${ params }`,
    method: 'get'
  })
}
