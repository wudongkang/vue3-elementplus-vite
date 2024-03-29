<template>
  <div class="action-container flex-item_f-1 flex-box flex_j_c-flex-end flex_a_i-center">
    <el-tooltip
      content="全屏"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        :name="`full-screen-${!fullScreen}`"
        @click="iconfontClickHandle('full-screen')" />
    </el-tooltip>
    <el-tooltip
      content="刷新页面"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        name="refresh"
        @click="iconfontClickHandle('refresh')" />
    </el-tooltip>
    <el-tooltip
      content="主题设置"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        name="set"
        @click="iconfontClickHandle('setting')" />
    </el-tooltip>
    <el-tooltip
      content="清理缓存"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        name="clear"
        @click="iconfontClickHandle('clear')" />
    </el-tooltip>
    <el-tooltip
      content="暗黑模式"
      placement="bottom"
      :show-after="500">
      <el-switch
        class="margin_r-15"
        v-model="mode"
        :active-value="ThemeMode.DARK"
        :inactive-value="ThemeMode.LIGHT"
        inline-prompt
        active-text="黑"
        inactive-text="亮"
        active-color="#222222" />
    </el-tooltip>
    <el-dropdown trigger="click" @command="dropdownHandle">
      <el-avatar
        class="cursor-pointer"
        :src="administrator.avatar">
        {{ administrator.nickname || administrator.username }}
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Theme ref="refTheme" v-if="visible" />
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import screenfull from 'screenfull'

import { useSettingsStore } from '@stores/settings'
import { useAdministratorStore } from '@stores/administrator'
import { useThemeStore } from '@stores/theme'
import { useRootStore } from '@/stores/root'

import { ElMessage } from 'element-plus'
import Theme from './theme.vue'

import { ThemeMode } from '@/utils/dictionary'

const router = useRouter()
const settingsStore = useSettingsStore()
const administratorStore = useAdministratorStore()
const themeStore = useThemeStore()
const rootStore = useRootStore()

const { fullScreen, refresh } = storeToRefs(settingsStore)
const { administrator } = storeToRefs(administratorStore)

const refTheme = ref()

const visible = ref(false)

const mode = computed({
  get: () => {
    return themeStore.mode
  },
  set: (val) => {
    themeStore.setMode(val)
  }
})

const iconfontClickHandle = (type) => {
  switch (type) {
    case 'full-screen':
      if (screenfull.isEnabled) {
        screenfull.toggle()
        fullScreen.value = !screenfull.isFullscreen
      } else {
        ElMessage({
          message: `Your browser doesn't support full screen`,
          type: 'warning'
        })
      }
      break
    case 'refresh':
      refresh.value = true
      nextTick(() => {
        refresh.value = false
      })
      break
    case 'setting':
      visible.value = true
      nextTick(() => {
        refTheme.value.init()
      })
      break
    case 'clear':
      rootStore.clear()
      break
  }
}

const dropdownHandle = async (command) => {
  switch (command) {
    case 'personal':
      router.push({ name: 'personal' })
      break
    case 'logout':
      await administratorStore.logout()
      rootStore.logout()
      router.push({ name: 'login' })
      break
  }
}
</script>

<style lang="scss" scoped>
.action-container {
  .iconfont {
    // margin-right: 15px;
  }
}
</style>
