import { createRouter, createWebHistory } from 'vue-router'
import { sidebarState } from '@/composables'
import NProgress from 'nprogress'
import useAuthStore from '@/stores/AuthStore'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Check Auth

router.beforeEach(async (to, from) => {
  NProgress.start()

  // Auth & Ability Check
  const authStore = useAuthStore()
  const authStatus = await authStore.checkAuthUser()

  if (to.meta.requiresAuth && !authStatus) {
    return { name: 'Login' }
  } else if (authStatus && (to.name === 'Login' || to.name === 'Register')) {
    return { name: 'Dashboard' }
  }
})

router.afterEach(() => {
  if (window.innerWidth <= 1024) {
    sidebarState.isOpen = false
  }
  NProgress.done()
})

export default router
