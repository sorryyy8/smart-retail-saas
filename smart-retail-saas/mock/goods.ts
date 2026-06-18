export default [
  {
    url: '/api/goods/list',
    method: 'get',
    response: (request: any) => {
      const { page = 1, pageSize = 10 } = request.query
      const total = 45 // 假定总共有 45 条数据
      
      const list = Array.from({ length: Number(pageSize) }).map((_, index) => ({
        id: `G${Date.now()}${index}`,
        name: `智能零售测试商品 ${index + 1 + (page - 1) * pageSize}`,
        price: (Math.random() * 100).toFixed(2),
        stock: Math.floor(Math.random() * 500),
        status: Math.random() > 0.2 ? '在售' : '下架'
      }))

      return {
        code: 200,
        message: 'success',
        data: { list, total }
      }
    }
  }
]