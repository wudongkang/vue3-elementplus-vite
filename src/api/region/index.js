/*
 * @Description: 全国区域
 * @Date: 2022-06-17 09:50:35

 * @LastEditTime: 2022-06-17 09:50:35
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*} */
export function listApi(params) {
  return service({
    url: `/admin/region/list/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*} */
export function infoApi(params) {
  return service({
    url: `/admin/region/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*} */
export function addApi(params) {
  return service({
    url: '/admin/region/create',
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
    url: '/admin/region/update',
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
    url: '/admin/region/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 下拉选择列表
 * @param {*} params
 * @return {*} */
export function selectListApi(params) {
  return service({
    url: `/admin/region/select/list/${ params }`,
    method: 'get'
  })
}
