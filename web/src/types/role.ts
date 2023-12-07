import type { Menu } from './menu'

export interface Role {
  id: number
  roleName: string
  createTime: string
  updateTime: string
  menus: Menu[]
}
