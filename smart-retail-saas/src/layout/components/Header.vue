<!-- src/layout/components/Header.vue -->
<template>
  <div class="header-container">
    <div class="left">
      <span style="font-weight: bold;">控制台</span>
    </div>
    
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link" style="cursor: pointer; display: flex; align-items: center;">
          {{ userStore.username || '超级管理员' }} 
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dialogVisible = true">个人信息</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="个人信息中心"
      width="400px"
      align-center
    >
      <div class="profile-card">
        <el-avatar :size="64" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <h3 style="margin-top: 15px;">{{ userStore.username || '超级管理员' }}</h3>
        
        <el-tag type="success" style="margin-top: 5px;">
          {{ userStore.roles.includes('admin') ? '系统超级管理员 (Admin)' : '普通商户店员 (Editor)' }}
        </el-tag>
        
        <el-descriptions :column="1" border style="margin-top: 20px; width: 100%;">
          <el-descriptions-item label="当前账号">
            {{ userStore.username || 'admin' }}
          </el-descriptions-item>
          <el-descriptions-item label="绑定手机">
            138-0000-8888
          </el-descriptions-item>
          <el-descriptions-item label="系统权限">
            <el-tag size="small" v-for="role in userStore.roles" :key="role" style="margin-right: 5px;">
              {{ role }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="安全状态">
            <span style="color: var(--el-color-success); font-weight: bold;">正常</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

// 控制弹窗的显示与隐藏
const dialogVisible = ref(false)

const handleLogout = () => {
  userStore.clearAuth()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.header-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--el-bg-color); 
  border-bottom: 1px solid var(--el-border-color-light); 
  color: var(--el-text-color-primary);
  transition: background-color 0.3s, border-color 0.3s;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}
</style>