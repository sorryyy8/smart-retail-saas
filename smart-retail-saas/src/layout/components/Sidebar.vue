<template>
  <div class="sidebar-container">
    <div class="logo">
      <h2>智能零售 SaaS</h2>
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      router
      unique-opened
    >
      <el-menu-item index="/">
        <el-icon><DataLine /></el-icon>
        <span>数据看板</span>
      </el-menu-item>

      <el-menu-item index="/goods">
        <el-icon><Goods /></el-icon>
        <span>商品管理</span>
      </el-menu-item>

      <el-menu-item index="/order">
        <el-icon><List /></el-icon>
        <span>订单管理</span>
      </el-menu-item>
      
      <el-menu-item index="/settings">
        <el-icon><Setting /></el-icon>
        <span>系统配置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  height: 100%;
  background-color: #304156;
  .logo {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #1f2d3d;
  }
  .el-menu-vertical {
    border-right: none;
  }
}
</style>