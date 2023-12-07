export interface Menu {
  id: number
  menuName: string
  icon: string
  route: string
  component: String
  createTime: string
  updateTime: string
  parentId?: number
  children?: Menu[]
}
