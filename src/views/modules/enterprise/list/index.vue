<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">搜索</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button v-permission="'enterprise:create'" type="primary" @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'enterprise:delete'"
            type="danger"
            :disabled="selection.length <= 0"
            @click="deleteHandle()">批量删除</el-button>
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
          label="Logo"
          prop="logo"
          width="80">
          <template v-slot="{ row }">
            <el-avatar :size="50" :src="row.logo" v-if="row.logo" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="描述"
          prop="describe" />
        <el-table-column
          align="center"
          label="是否启用"
          prop="status"
          width="100">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'enterprise:status'"
              @change="statusHandle(row)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0" />
          </template>
        </el-table-column>
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
              v-permission="'enterprise:update'"
              type="primary"
              link
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'enterprise:delete'"
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
import { clearJson, havePermission, parseDate2Str } from '@/utils'

import { pageApi, deleteApi, setStatusApi } from '@/api/enterprise'

const { page } = usePage()

const refForm = ref()
const refTable = ref()
const refAddEdit = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  name: '',
  date: []
})
const list = ref([])
const selection = ref([])

const getList = () => {
  const params = {
    name: form.name,
    start: form.date && form.date.length > 0 ? parseDate2Str(form.date[0]) : '',
    end: form.date && form.date.length > 1 ? parseDate2Str(form.date[1]) : '',
    current: page.current,
    size: page.size
  }
  loading.value = true
  pageApi(params).then(r => {
    if (r) {
      list.value = r.data.list
      page.total = r.data.total
    }
    nextTick(() => { loading.value = false })
  })
}

const reacquireHandle = () => {
  page.current = 1
  getList()
}

const addEditHandle = (id) => {
  visible.value = true
  nextTick(() => {
    refAddEdit.value.init(id)
  })
}

const deleteHandle = (id) => {
  const ids = id ? [id] : selection.value.map(item => item.id)
  ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApi({ keys: ids }).then(r => {
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

const statusHandle = (row) => {
  const params = {
    key: row.id,
    value: row.status
  }
  setStatusApi(params).then(r => {
    if (r) {
      ElMessage({
        message: '操作成功!',
        type: 'success'
      })
    } else {
      row.status = row.status === 1 ? 0 : 1
    }
  })
}

const selectionHandle = (val) => {
  selection.value = val
}

const pageChangeHandle = (argPage) => {
  page.current = argPage.current
  page.size = argPage.size
  getList()
}

onBeforeMount(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 5px;
}
</style>
