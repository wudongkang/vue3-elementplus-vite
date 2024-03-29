<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item v-if="havePermission('configuration:list&backup:updateConfig', '&')">
          <el-button
            v-permission="'backup:updateConfig'"
            type="primary"
            @click="setHandle()">配置</el-button>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.type" placeholder="备份方式" clearable>
            <el-option
              v-for="item in dictionaryList"
              :key="item.value"
              :value="item.value"
              :label="item.label" />
          </el-select>
        </el-form-item>
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
            v-permission="'backup:backup'"
            type="primary"
            @click="backupHandle()">备份</el-button>
          <el-button
            v-permission="'backup:delete'"
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
          label="文件名"
          prop="name" />
        <el-table-column
          align="center"
          label="数据库名称"
          prop="database"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="物理路径"
          prop="path"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="虚拟路径"
          prop="url" />
        <el-table-column
          align="center"
          label="执行命令"
          prop="cmd"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="备份方式"
          prop="type">
          <template v-slot="{ row }">
            <el-tag :type="row.type === 1 ? 'success' : 'info'">
              {{ dictionaryMap[row.type] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备份时间"
          prop="created_at"
          width="160"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'backup:recovery'"
              type="primary"
              link
              @click="recoveryHandle(row.id)">恢复</el-button>
            <el-button
              v-permission="'backup:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Setups ref="refSetups" v-if="visible" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import Setups from './components/setups.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str, havePermission } from '@/utils'

import { pageApi, delApi, backupApi, recoveryApi } from '@/api/backup'

const { page } = usePage()
const { dictionaryMap, dictionaryList, getDictionary } = useDictionary()

const refForm = ref()
const refTable = ref()
const refSetups = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  type: '',
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
 * @description: 配置弹窗
 * @param {*}
 * @return {*} */
const setHandle = () => {
  visible.value = true
  nextTick(() => {
    refSetups.value.init()
  })
}

/**
 * @description: 备份
 * @param {number} id
 * @return {*} */
const backupHandle = () => {
  ElMessageBox.confirm(`确定进行[备份]操作`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    backupApi().then(r => {
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
 * @description: 恢复
 * @param {number} id
 * @return {*} */
const recoveryHandle = (id) => {
  ElMessageBox.confirm(`确定进行[恢复]操作`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    recoveryApi({ key: id }).then(r => {
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
  getDictionary('backup')
  getList()
})

// const { loading, visible, form, list, selection } = toRefs(data)
</script>
