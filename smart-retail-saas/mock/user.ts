// mock/user.ts
export default [
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return { code: 200, message: '登录成功', data: { token: 'smart-retail-token-666888' } }
    }
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        data: { roles: ['admin'], username: '超级管理员' } // 模拟当前登录的是 admin 角色
      }
    }
  }
]