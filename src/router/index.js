import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/aventos.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/cart.vue')
    },
    {
      path: '/aventos',
      name: 'aventos',
      component: () => import("@/components/aventos.vue")
    },
    {
      path: '/hinge',
      name: 'hinge',
      component: () => import("@/components/hinge.vue")
    },
    {
      path: '/runnerSystems',
      component: () => import('@/components/runners.vue')
    },
    {
      path: '/boxSystems',
      component: () => import('@/components/boxSystems.vue')
    },
    {
      path: '/item/:name/',
      component: () => import('@/views/itemDescription.vue')
    }
  ]
})



export default router
