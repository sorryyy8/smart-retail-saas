export default [
  {
    url: '/api/order/list',
    method: 'get',
    response: (request: any) => {
      const { page = 1, pageSize = 10, orderNo, status } = request.query
      
      // 生成 45 条基础假数据
      let list = Array.from({ length: 45 }).map((_, index) => {
        // 随机生成状态：待付款、已发货、已完成
        const statusMap = ['待付款', '已发货', '已完成']
        const randomStatus = statusMap[Math.floor(Math.random() * statusMap.length)]
        
        return {
          id: index + 1,
          orderNo: `ORD${20231000 + index}`,
          customerName: `客户${index + 1}`,
          amount: (Math.random() * 1000).toFixed(2),
          status: randomStatus,
          createTime: `2023-10-${String((index % 30) + 1).padStart(2, '0')} 14:30:00`
        }
      })

      // 模拟多条件筛选逻辑
      if (orderNo) {
        list = list.filter(item => item.orderNo.includes(orderNo))
      }
      if (status) {
        list = list.filter(item => item.status === status)
      }

      const start = (page - 1) * pageSize
      const end = start + Number(pageSize)
      const pagedList = list.slice(start, end)

      return {
        code: 200,
        message: 'success',
        data: {
          list: pagedList,
          total: list.length 
        }
      }
    }
  }
]