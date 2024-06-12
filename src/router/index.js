import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/mainContent.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/cart.vue')
    },
    {
      path: '/item/:name/',
      component: () => import('@/views/itemDescription.vue')
    }
  ]
})

export default router
