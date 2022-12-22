/*
 * @Description: 邮件发送记录
 * @Date: 2022-06-24 09:20:26

 * @LastEditTime: 2022-06-24 09:20:26
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*} */
export function pageApi(params) {
  return service({
    url: '/admin/mail/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 发送邮件
 * @param {*}
 * @return {*} */
export function addApi(params) {
  return service({
    url: '/admin/mail/create',
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
    url: '/admin/mail/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 更新配置
 * @param {*}
 * @return {*} */
export function updateConfigApi(params) {
  return service({
    url: '/admin/mail/update/config',
    method: 'post',
    data: params
  })
}
