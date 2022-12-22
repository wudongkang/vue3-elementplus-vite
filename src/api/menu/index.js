/*
 * @Description: 菜单
 * @Date: 2020-12-28 16:25:18

 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 获取所有菜单 权限
 * @param {*}
 * @return {*} */
export function selectListApi() {
  return service({
    url: '/admin/menu/select/list',
    method: 'get'
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*} */
export function infoApi(params) {
  return service({
    url: `/admin/menu/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*} */
export function addApi(params) {
  return service({
    url: `/admin/menu/create`,
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
    url: `/admin/menu/update`,
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
    url: `/admin/menu/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 拖拽 更新 父级ID 和 排序
 * @param {*}
 * @return {*} */
export function dragApi(params) {
  return service({
    url: `/admin/menu/drag`,
    method: 'post',
    data: params
  })
}
