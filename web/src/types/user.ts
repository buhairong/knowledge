export interface menu {
  id: number
  menuName: string
  icon: string
  route: string
  component: string
  parentId?: number
  createTime: string
  updateTime: string
  children: menu[]
}

export interface role {
  id: number
  roleName: string
  createTime: string
  updateTime: string
  menus: menu[]
}

export interface user {
  id: number
  username: string
  password: string
  nickname: string
  openid: string
  createTime: string
  updateTime: string
  lastLoginTime: string,
  roles: role[]
}