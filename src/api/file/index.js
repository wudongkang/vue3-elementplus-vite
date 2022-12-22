/*
 * @Description: 文件
 * @Date: 2022-06-21 05:29:36

 * @LastEditTime: 2022-06-21 05:29:36
 */
import service from '@/utils/request'
import { parseJson2Param, getApiBaseUrl } from '@/utils'
import { ContentType } from '@/utils/dictionary'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*} */
export function pageApi(params) {
  return service({
    url: '/admin/file/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*} */
export function delApi(params) {
  return service({
    url: '/admin/file/delete',
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
    url: '/admin/file/update/config',
    method: 'post',
    data: params
  })
}

/**
 * @description: 上传
 * @param {*}
 * @return {*} */
export function uploadUrlApi(params) {
  let result = ''
  const options = {
    url: '/admin/file/upload',
    method: 'post',
    params: params
  }
  result = `${ getApiBaseUrl(import.meta.env) + options.url }${ options.params ? parseJson2Param(options.params) : '' }`
  return result
}

/**
 * @description: 文件上传
 * @param {*}
 * @return {*} */
export function uploadApi(params) {
  const formData = new FormData()
  for (const key in params) {
    formData.append(key, params[key])
  }
  return service({
    url: '/admin/file/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': ContentType.UPLOAD
    }
  })
}

/**
 * @description: 分片上传
 * @param {*}
 * @return {*} */
export function uploadSliceApi(params) {
  const formData = new FormData()
  for (const key in params) {
    formData.append(key, params[key])
  }
  return service({
    url: '/admin/file/slice/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': ContentType.UPLOAD
    }
  })
}

/**
 * @description: 分片合并
 * @param {*}
 * @return {*} */
export function mergeSliceApi(params) {
  return service({
    url: '/admin/file/slice/merge',
    method: 'post',
    data: params
  })
}

/**
 * @description: 分片删除
 * @param {*}
 * @return {*} */
export function deleteSliceApi(params) {
  return service({
    url: '/admin/file/slice/delete',
    method: 'post',
    data: params
  })
}
