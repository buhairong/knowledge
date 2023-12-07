import type { Role } from './role'

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
