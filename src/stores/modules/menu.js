import { defineStore } from 'pinia'

import { getGet, setGet, clearGet, getMenuAndPermission, setMenuAndPermission, clearMenuAndPermission } from '@/utils/storage'
import { MENU_KEY, PERMISSION_KEY } from '@/utils/constant'
import { selfInfoApi } from '@/api/enterprise-menu'
import { useAdministratorStore } from './administrator'

// 初始化菜单 权限 数据
const data = getMenuAndPermission()

/**
 * @description: 递归筛选出 目录、菜单
 * @param {Array} list
 * @param {Number} mode 1-显示的 2-所有的
 * @return {*} */
function menuProcessing(list = [], mode = 1) {
  const result = []
  list.forEach(item => {
    if (item.type !== 2) {
      if (mode === 2 || item.show === 1) {
        const menu = {
          id: item.menu_id,
          name_cn: item.name_cn,
          name_en: item.name_en,
          icon: item.icon,
          type: item.type,
          url: item.url,
          path: item.type === 3 ? `/i-${ item.menu_id }` : item.path || (item.url ? `/${ item.url.replace(/\//g, '-') }` : ''),
          name: item.type === 3 ? `i-${ item.menu_id }` : item.name || (item.url ? item.url.replace(/\//g, '-') : ''),
          children: []
        }
        if (item.children && item.children.length > 0) {
          menu.children = menuProcessing(item.children, mode)
        }
        result.push(menu)
      }
    }
  })
  return result
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    get: getGet(),
    menus: data[MENU_KEY],
    permissions: data[PERMISSION_KEY],
    active: '',
    collapse: false
  }),
  getters: {
    displayedMenus: state => menuProcessing(state.menus),
    allMenus: state => menuProcessing(state.menus, 2)
  },
  actions: {
    /**
     * 设置是否获取过 菜单 权限
     * @param {*}
     * @returns
     */
    setGet(val = true) {
      setGet(val)
      this.get = val
    },
    /**
     * 获取当前管理员 菜单 权限
     * @param {*}
     * @returns
     */
    async getMenuAndPermission() {
      const params = {
        roleId: '1'
        // roleId: useAdministratorStore().administrator.id
      }
      const r = await selfInfoApi(params)
      console.log(r)
      if (r) {
        this.get = true
        setMenuAndPermission(r.data)
        this.menus = r.data.menus
        this.permissions = r.data.permissions
      }
      return r && r.data ? r.data.menus : []
    },
    /**
     * 清除菜单 权限 信息
     * @param {*}
     */
    clear() {
      clearGet()
      clearMenuAndPermission()
      this.get = false,
      this.menus = []
      this.permissions = []
    }
  }
})

