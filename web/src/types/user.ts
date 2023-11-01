export interface menu {
  menuId: number,
  menuName: string,
  icon: string,
  parentId?: number,
  children: menu[],
}

export interface role {
  roleId: number,
  roleName: string,
  menus: menu[],
}

export interface user {
  userId: number,
  username: string,
  password: string,
  openid: string,
  roles: role[],
}