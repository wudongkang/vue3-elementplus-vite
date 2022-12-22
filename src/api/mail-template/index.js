/*
 * @Description: 邮件模版
 * @Date: 2022-06-24 09:20:25

 * @LastEditTime: 2022-06-24 09:20:25
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*} */
export function pageApi(params) {
  return service({
    url: '/admin/mail/template/page',
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
    url: `/admin/mail/template/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*} */
export function addApi(params) {
  return service({
    url: '/admin/mail/template/create',
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
    url: '/admin/mail/template/update',
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
    url: '/admin/mail/template/delete',
    method: 'post',
    data: params
  })
}
