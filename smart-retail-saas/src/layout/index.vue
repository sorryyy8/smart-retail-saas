<template>
  <el-container class="app-wrapper">
    <!-- 左侧边栏 -->
    <el-aside width="210px" class="sidebar-wrapper">
      <Sidebar />
    </el-aside>
    
    <!-- 右侧容器 -->
    <el-container class="main-container">
      <!-- 顶部导航 -->
      <el-header height="50px" style="padding: 0;">
        <Header />
      </el-header>
      
      <!-- 主体内容区 -->
      <el-main style="padding: 0;">
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import AppMain from './components/AppMain.vue'
</script>

<style scoped lang="scss">
.app-wrapper {
  height: 100vh;
  width: 100%;
}
.sidebar-wrapper {
  background-color: #304156;
  height: 100%;
  overflow-y: auto;
}
.main-container {
  height: 100%;
}
</style>