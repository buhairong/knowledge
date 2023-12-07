export const ERR_MSG_STATUS = {
  other: { code: 1001, msg: '系统繁忙' },
  401: { code: 401, msg: '没有权限' },
  1101: { code: 1101, msg: '用户名或密码错误' },
  1102: { code: 1102, msg: '原密码错误' },
  1103: { code: 1103, msg: '密码修改失败' },
  1104: { code: 1104, msg: '查询失败' },
  1105: { code: 1105, msg: '用户删除失败' },
  '/api/v1/auth/signup': { code: 1101, msg: '用户名已存在，请换一个用户名' },
  '/api/v1/user': { code: 1101, msg: '用户名已存在，请换一个用户名' },
  '/api/v1/role': { code: 1102, msg: '角色名已存在，请换一个角色名' },
  '/api/v1/menu': { code: 1103, msg: '菜单名已存在，请换一个菜单名' },
};
