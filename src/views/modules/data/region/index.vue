<template>
  <Container>
    <template #header v-if="havePermission('region:create')">
      <el-form ref="refForm" :inline="true">
        <el-form-item>
          <el-button
            v-permission="'region:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        lazy
        row-key="id"
        :data="list"
        :load="loadHandle"
        :tree-props="props"
        border>
        <el-table-column
          align="left"
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="编号"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="等级"
          prop="level">
          <template v-slot="{ row }">
            {{ dictionaryMap[row.level] }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="区域编码"
          prop="code" />
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          width="160" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'region:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'region:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="init" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import useDictionary from '@/mixins/dictionary'
import { havePermission } from '@/utils'

import { listApi, delApi } from '@/api/region'

const { dictionaryMap, getDictionary } = useDictionary()

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()
const props = { children: 'children', hasChildren: 'hasChildren' }
const loading = ref(false)
const visible = ref(false)
const list = ref([])

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*} */
const getList = async (id = 0) => {
  const r = await listApi(id)
  if (r) {
    r.data.forEach(item => {
      if (item.level < 3) {
        item.hasChildren = true
      }
    })
  }
  return r
}

/**
 * @description: 首次加载获取值
 * @param {*} async
 * @return {*} */
const init = async () => {
  loading.value = true
  list.value = []
  list.value = (await getList()).data || []
  nextTick(() => {
    loading.value = false
  })
}

/**
 * @description: 懒加载事件
 * @param {*}
 * @return {*} */
const loadHandle = (row, _treeNode, resolve) => {
  getList(row.id).then(r => {
    if (r) {
      resolve(r.data)
    } else {
      resolve([])
    }
  })
}

/**
 * @description: 新增/编辑弹窗
 * @param {*}
 * @return {*} */
const addEditHandle = id => {
  visible.value = true
  nextTick(() => {
    refAddEdit.value.init(id)
  })
}

/**
 * @description: 删除
 * @param {number} id
 * @return {*} */
const deleteHandle = id => {
  ElMessageBox.confirm(`确定对[id=${ id }]进行[删除]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    delApi({ key: id }).then(r => {
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        init()
      }
    })
  }).catch(() => {
  // to do something on canceled
  })
}

onBeforeMount(() => {
  getDictionary('region')
  init()
})
</script>
