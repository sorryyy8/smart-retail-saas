import { ref, reactive, onMounted } from 'vue'

export function useTable<T>(apiFn: (params: any) => Promise<any>, initParams: object = {}) {
  const tableData = ref<T[]>([]) 
  const total = ref(0)          
  const loading = ref(false)     

  const queryParams = reactive({
    page: 1,
    pageSize: 10,
    ...initParams
  })

  const getTableData = async () => {
    loading.value = true
    try {
      const res = await apiFn(queryParams)
      tableData.value = res.list
      total.value = res.total
    } catch (error) {
      console.error('获取表格数据失败', error)
    } finally {
      loading.value = false
    }
  }

  const handleSizeChange = (val: number) => {
    queryParams.pageSize = val
    queryParams.page = 1 
    getTableData()
  }

  const handleCurrentChange = (val: number) => {
    queryParams.page = val
    getTableData()
  }

  onMounted(() => {
    getTableData()
  })

  return {
    tableData,
    total,
    loading,
    queryParams,
    getTableData,
    handleSizeChange,
    handleCurrentChange
  }
}