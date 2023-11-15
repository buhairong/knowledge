export interface Menu {
  id: number
  menuName: string
  icon: string
  route: string
  component: string
  parentId?: number
  createTime: string
  updateTime: string
  children: Menu[]
}

export interface Role {
  id: number
  roleName: string
  createTime: string
  updateTime: string
  menus: Menu[]
}

export interface User {
  id: number
  username: string
  password: string
  nickname: string
  openid: string
  createTime: string
  updateTime: string
  lastLoginTime: string
  valid: number
  access_token: string
  roles: Role[]
}

export interface Login {
  username: string
  password: string
}

export interface ChangePwd {
  oldPassWord: string
  newPassWord: string
}
