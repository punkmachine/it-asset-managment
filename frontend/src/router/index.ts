import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'equipments',
      component: () => import('@/views/equipments/view.vue'),
    },
    {
      path: '/equipment/:id',
      name: 'equipment',
      component: () => import('@/views/equipment/view.vue'),
    },
    {
      path: '/branches',
      name: 'branches',
      component: () => import('@/views/branches/view.vue'),
    },
    {
      path: '/equipment-settings',
      name: 'equipment-settings',
      component: () => import('@/views/equipment-settings/view.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/view.vue'),
    },
    {
      path: '/new-equipment',
      name: 'new-equipment',
      component: () => import('@/views/new-equipment/view.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/view.vue'),
    },
    {
      path: '/:notFound',
      name: 'not-found',
      component: () => import('@/views/404/view.vue'),
    },
  ]
})

export default router
