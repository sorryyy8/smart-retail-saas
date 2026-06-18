<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>今日销售额</template>
          <div style="font-size: 28px; color: #409EFF; font-weight: bold;">¥ 34,567.00</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>本周新增会员</template>
          <div style="font-size: 28px; color: #67C23A; font-weight: bold;">1,234 人</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>库存告警商品</template>
          <div style="font-size: 28px; color: #F56C6C; font-weight: bold;">12 件</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>多门店近七日销售趋势</template>
      <div ref="chartRef" style="width: 100%; height: 400px;"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

const handleResize = () => {
  myChart?.resize()
}

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value)
    
    const option = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['旗舰店', '城西分店', '大学城店'],top: '0%'  },
      grid: {top: '15%', left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      yAxis: { type: 'value' },
      series: [
        { name: '旗舰店', type: 'line', smooth: true, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: '城西分店', type: 'line', smooth: true, data: [220, 182, 191, 234, 290, 330, 310] },
        { name: '大学城店', type: 'line', smooth: true, data: [150, 232, 201, 154, 190, 330, 410] }
      ]
    }
    myChart.setOption(option)
    
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  myChart?.dispose()
  myChart = null
})
</script>

<style scoped>
.dashboard-container {
  padding: 10px;
}
</style>