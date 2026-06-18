<template>
  <div class="order-container">
    <el-card shadow="never" class="search-card">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.orderNo" placeholder="请输入订单编号" clearable />
        </el-form-item>
        
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" placeholder="全部状态" clearable style="width: 150px;">
            <el-option label="待付款" value="待付款" />
            <el-option label="已发货" value="已发货" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查 询
          </el-button>
          <el-button @click="resetSearch">
            <el-icon><Refresh /></el-icon> 重 置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 2. 表格与操作区 -->
    <el-card shadow="never" style="margin-top: 15px;">
      <div style="margin-bottom: 15px;">
        <el-button type="success" @click="handleExportExcel" :loading="exportLoading">
          <el-icon><Download /></el-icon> 导出当前页为 Excel
        </el-button>
      </div>

      <el-table :data="tableData" v-loading="loading" border stripe style="width: 100%">
        <el-table-column prop="orderNo" label="订单编号" width="150" />
        <el-table-column prop="customerName" label="客户名称" width="120" />
        <el-table-column prop="amount" label="订单金额(元)" width="120">
          <template #default="{ row }">
            <span style="color: #f56c6c; font-weight: bold;">¥ {{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="160" />
      </el-table>

      <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import request from '@/utils/request'
import { useTable } from '@/hooks/useTable'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx' // 引入 excel 核心库

const searchForm = reactive({
  orderNo: '',
  status: '',
  dateRange: []
})

const getStatusType = (status: string) => {
  const map: Record<string, string> = {
    '待付款': 'warning',
    '已发货': 'primary',
    '已完成': 'success'
  }
  return map[status] || 'info'
}

const getOrderApi = (params: any) => request.get('/order/list', { params })
const { 
  tableData, total, loading, queryParams, 
  getTableData, handleSizeChange, handleCurrentChange 
} = useTable<any>(getOrderApi)

const handleSearch = () => {
  Object.assign(queryParams, searchForm)
  queryParams.page = 1 
  getTableData()
}

const resetSearch = () => {
  searchForm.orderNo = ''
  searchForm.status = ''
  searchForm.dateRange = []
  handleSearch()
}

const exportLoading = ref(false)

const handleExportExcel = () => {
  if (tableData.value.length === 0) {
    ElMessage.warning('当前没有数据可以导出')
    return
  }
  
  exportLoading.value = true
  try {
    // 1. 数据格式化：把英文的字段名映射成中文表头
    const exportData = tableData.value.map(row => {
      return {
        '订单编号': row.orderNo,
        '客户名称': row.customerName,
        '订单金额(元)': row.amount,
        '订单状态': row.status,
        '创建时间': row.createTime
      }
    })

    // 2. 将 JSON 数据转换为 Excel 的工作表 (Worksheet)
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    
    // 3. 创建一个新的工作簿 (Workbook)
    const workbook = XLSX.utils.book_new()
    
    // 4. 将工作表附加到工作簿中，并命名为'订单数据'
    XLSX.utils.book_append_sheet(workbook, worksheet, '订单数据')
    
    // 5. 生成 Excel 文件并触发浏览器下载
    XLSX.writeFile(workbook, `智能零售订单导出_${new Date().getTime()}.xlsx`)
    
    ElMessage.success('导出成功！')
  } catch (error) {
    console.error('导出失败', error)
    ElMessage.error('导出 Excel 失败')
  } finally {
    exportLoading.value = false
  }
}
</script>

<style scoped>
.order-container {
  padding: 10px;
}
.search-card {
  margin-bottom: 10px;
}
.demo-form-inline .el-form-item {
  margin-bottom: 0;
  margin-right: 20px;
}
</style>