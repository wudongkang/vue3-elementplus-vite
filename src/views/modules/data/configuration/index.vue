<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">查询</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button
            v-permission="'configuration:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'configuration:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        @selection-change="selectionHandle"
        border>
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="键"
          prop="json_key" />
        <el-table-column
          align="center"
          label="Json值"
          prop="json_value"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="备注"
          prop="remark"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          :show-overflow-tooltip="true">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'configuration:status'"
              @change="statusHandle(row)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="类型值"
          prop="type" />
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          width="160"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at"
          width="160"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'configuration:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'configuration:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, delApi, statusApi } from '@/api/configuration'

const { page } = usePage()
const { dictionaryMap, getDictionary } = useDictionary()

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  key: '',
  date: []
})
const list = ref([])
const selection = ref([])

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*} */
const getList = () => {
  const params = {
    ...form,
    start: form.date && form.date.length ? parseDate2Str(form.date[0]) : '',
    end: form.date && form.date.length ? parseDate2Str(form.date[1]) : '',
    current: page.current,
    size: page.size
  }
  loading.value = true
  pageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

/**
 * @description: 重新获取、重置 数据
 * @param {*}
 * @return {*} */
const reacquireHandle = () => {
  page.current = 1
  getList()
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
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    delApi({ keys: ids }).then(r => {
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        getList()
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

/**
 * @description: 状态
 * @param {number} id
 * @return {*} */
const statusHandle = row => {
  ElMessageBox.confirm(`确定对[id=${ row.id }]进行[${ dictionaryMap.value[row.status] }]操作`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const params = {
      key: row.id,
      value: row.status
    }
    statusApi(params).then(r => {
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        getList()
      }
    })
  }).catch(() => {
    // to do something on canceled
  })
}

/**
 * @description: table多选事件
 * @param {*} val
 * @return {*} */
const selectionHandle = val => {
  selection.value = val
}

/**
 * @description: 分页变化事件
 * @param {*}
 * @return {*} */
const pageChangeHandle = argPage => {
  page.current = argPage.current
  page.size = argPage.size
  getList()
}

onBeforeMount(() => {
  getDictionary('status')
  getList()
})
</script>
