import { type App, type DirectiveBinding } from 'vue'
import { useUserStore } from '@/store/modules/user'

export default {
  install(app: App) {
    app.directive('permission', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding
        const userStore = useUserStore()
        const roles = userStore.roles 

        if (value && value instanceof Array && value.length > 0) {
          const permissionRoles = value
          const hasPermission = roles.some(role => permissionRoles.includes(role))

          if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el)
          }
        } else {
          throw new Error(`请规范使用指令，如: v-permission="['admin','editor']"`)
        }
      }
    })
  }
}