# 🛒 智能零售 SaaS 管理后台 (Smart Retail SaaS)

基于 **Vue3 + TypeScript + Element Plus** 构建的企业级轻量型零售 SaaS 管理系统。

## 💡 项目亮点 (Features)
- 🔐 **完备的权限架构**：基于 Vue Router 的 RBAC 动态权限路由，实现页面级与按钮级（`v-permission`自定义指令）的跨门店权限隔离。
- 📦 **企业级基建封装**：使用 TypeScript 深度封装 Axios，实现 Token 无感拦截与统一业务错误处理。结合 `Mock.js` 搭建本地脱机联调环境。
- ⚡️ **自定义 Hooks 复用**：提炼后台高频 CRUD 逻辑，封装声明式 `useTable` 组合式函数，零配置实现分页、查询、Loading 状态管理，减少 30% 冗余代码。
- 📊 **多维数据看板**：集成 ECharts 实现多店铺维度数据可视化，处理了图表自适应（ResizeObserver）及实例销毁防内存泄漏。
- 🎨 **工程化与 UI 体验**：基于 Element Plus CSS Variables 实现一键无缝全站暗黑/浅色模式切换；集成 `xlsx` 实现纯前端多条件筛选与 Excel 导出。

## 🛠 技术栈 (Tech Stack)
- **核心框架**：Vue 3.x (Composition API), Vite, TypeScript
- **状态管理**：Pinia
- **路由控制**：Vue Router 4
- **UI 组件库**：Element Plus
- **网络与模拟**：Axios, Mock.js (vite-plugin-mock)
- **数据可视化**：ECharts 5
- **辅助工具**：XLSX (纯前端 Excel 导出)

## 🚀 快速启动 (Quick Start)

```bash
# 1. 克隆项目
git clone https://github.com/sorryyy8/smart-retail-saas.git

# 2. 安装依赖
npm install

# 3. 启动项目 (附带本地 Mock 环境)
npm run dev

测试账号
系统已内置 Mock 数据拦截，无需额外启动后端服务：
超级管理员：用户名 admin / 密码 随意（拥有所有权限，可体验商品删除、设置项等）
普通店员：用户名 editor / 密码 随意（无删除商品权限、无系统配置权限）
