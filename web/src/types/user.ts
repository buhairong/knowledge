export interface menu {
  id: number,
  menuName: string,
  icon: string,
  route: string,
  component: string,
  parentId?: number,
  children: menu[],
}

export interface role {
  id: number,
  roleName: string,
  menus: menu[],
}

export interface user {
  id: number,
  username: string,
  password: string,
  openid: string,
  roles: role[],
}