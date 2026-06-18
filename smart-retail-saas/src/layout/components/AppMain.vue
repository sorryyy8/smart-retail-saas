<template>
  <section class="app-main">
    <router-view />
  </section>
</template>

<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background-color: var(--el-bg-color-page); 
  box-sizing: border-box;
  transition: background-color 0.3s;
}
</style>