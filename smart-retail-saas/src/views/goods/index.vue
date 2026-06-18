<template>
  <el-card>
    <h2>商品管理</h2>
    
    <div style="margin: 20px 0;">
      <el-button type="primary" @click="getTableData">
        <el-icon><Refresh /></el-icon> 刷新数据
      </el-button>
      
      <el-button 
        type="danger" 
        v-permission="['admin']" 
        :disabled="selectedIds.length === 0"
        @click="handleBatchDelete"
      >
        <el-icon><Delete /></el-icon> 批量删除 (已选 {{ selectedIds.length }} 个)
      </el-button>
    </div>

    <el-table 
      :data="tableData" 
      v-loading="loading" 
      border 
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      
      <el-table-column prop="id" label="商品编号" width="180" />
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="price" label="价格(元)" width="120" />
      <el-table-column prop="stock" label="库存" width="100" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === '在售' ? 'success' : 'info'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
      <el-pagination
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 30]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import request from '@/utils/request'
import { useTable } from '@/hooks/useTable'
import { ElMessageBox, ElMessage } from 'element-plus' // 👇 引入确认框和消息提示

const getGoodsApi = (params: any) => request.get('/goods/list', { params })

const { 
  tableData, total, loading, queryParams, 
  getTableData, handleSizeChange, handleCurrentChange 
} = useTable<any>(getGoodsApi)

const selectedIds = ref<string[]>([])

const handleSelectionChange = (selection: any[]) => {
  selectedIds.value = selection.map(item => item.id)
}

const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) return

  ElMessageBox.confirm(
    `确定要永久删除选中的 ${selectedIds.value.length} 个商品吗？该操作不可逆！`,
    '系统提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    
    ElMessage({
      type: 'success',
      message: '批量删除成功！',
    })
    
    selectedIds.value = []
    getTableData()
  }).catch(() => {
  })
}
</script>