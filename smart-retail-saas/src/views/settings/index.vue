<!-- src/views/settings/index.vue -->
<template>
  <div class="settings-container">
    <el-card>
      <h2>系统参数与配置</h2>
      
      <!-- 选项卡结构 -->
      <el-tabs v-model="activeTab" style="margin-top: 20px;">
        
        <!-- 1. 基本信息配置 -->
        <el-tab-pane label="商户基本信息" name="basic">
          <el-form :model="shopForm" label-width="120px" style="max-width: 500px; margin-top: 20px;">
            <el-form-item label="商户名称">
              <el-input v-model="shopForm.name" />
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="shopForm.phone" />
            </el-form-item>
            <el-form-item label="门店地址">
              <el-input v-model="shopForm.address" type="textarea" />
            </el-form-item>
            <el-form-item label="营业状态">
              <el-radio-group v-model="shopForm.isOpen">
                <el-radio :value="true">营业中</el-radio>
                <el-radio :value="false">暂停营业</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave('商户信息保存成功！')">保存修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 2. 交易参数配置 -->
        <el-tab-pane label="交易安全参数" name="transaction">
          <el-form :model="tradeForm" label-width="150px" style="max-width: 500px; margin-top: 20px;">
            <el-form-item label="未付款订单自动取消">
              <el-input-number v-model="tradeForm.cancelTime" :min="5" :max="60" />
              <span class="unit-text">分钟</span>
            </el-form-item>
            <el-form-item label="库存预警阈值">
              <el-input-number v-model="tradeForm.stockLimit" :min="1" :max="100" />
              <span class="unit-text">件</span>
            </el-form-item>
            <el-form-item label="满减活动开关">
              <el-switch v-model="tradeForm.enableDiscount" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave('安全参数配置生效！')">应用配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="界面个性化" name="personal">
          <div class="theme-setting" style="margin-top: 20px;">
            <p class="section-title">系统视觉风格设置</p>
            
            <div class="setting-item" style="margin: 20px 0; display: flex; align-items: center;">
              <span style="margin-right: 20px; font-size: 14px; color: var(--el-text-color-primary);">暗黑（深色）模式开关：</span>
              <el-switch 
                v-model="isDark" 
                active-text="开启" 
                inactive-text="关闭"
                @change="handleThemeChange"
              />
            </div>
            
            <p class="tip-text">提示：开启后将自动基于 Element Plus CSS Variables 渲染全局深色主题。</p>
          </div>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('basic')

const shopForm = ref({
  name: '智能零售旗舰店(测试店)',
  phone: '138-0000-0000',
  address: '杭州市西湖区数字化产业基地A座 103室',
  isOpen: true
})
const tradeForm = ref({
  cancelTime: 15,
  stockLimit: 10,
  enableDiscount: true
})

const isDark = ref(document.documentElement.classList.contains('dark'))

const handleThemeChange = (val: string | number | boolean) => {
  if (val) {
    document.documentElement.classList.add('dark')
    ElMessage.success('已切换至深色（暗黑）模式')
  } else {
    document.documentElement.classList.remove('dark')
    ElMessage.success('已切换至浅色模式')
  }
}

const handleSave = (msg: string) => {
  ElMessage.success(msg)
}
</script>

<style scoped lang="scss">
.settings-container {
  padding: 10px;
}
.unit-text {
  margin-left: 10px;
  color: var(--el-text-color-regular);
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}
.tip-text {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>