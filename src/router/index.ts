import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupRouterGuard } from './guards'

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  scrollBehavior: () => ({ top: 0 })
})

export function setupRouter(app: App<Element>): void {
  app.use(router)
  setupRouterGuard(router)
}

export default router
