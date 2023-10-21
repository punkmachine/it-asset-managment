import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'equipments',
      component: () => import('@/views/equipments/view.vue'),
      meta: {
        secure: true,
        layout: 'main',
      }
    },
    {
      path: '/equipment/:id',
      name: 'equipment',
      component: () => import('@/views/equipment/view.vue'),
      meta: {
        secure: true,
        layout: 'main',
      }
    },
    {
      path: '/branches',
      name: 'branches',
      component: () => import('@/views/branches/view.vue'),
      meta: {
        secure: true,
        layout: 'main',
      }
    },
    {
      path: '/equipment-settings',
      name: 'equipment-settings',
      component: () => import('@/views/equipment-settings/view.vue'),
      meta: {
        secure: true,
        layout: 'main',
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/view.vue'),
      meta: {
        secure: false,
        layout: 'empty',
      }
    },
    {
      path: '/new-equipment',
      name: 'new-equipment',
      component: () => import('@/views/new-equipment/view.vue'),
      meta: {
        secure: true,
        layout: 'main',
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/view.vue'),
      meta: {
        secure: true,
        layout: 'main',
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/users/view.vue'),
      meta: {
        secure: true,
        layout: 'main',
      }
    },
    {
      path: '/:notFound',
      name: 'not-found',
      component: () => import('@/views/404/view.vue'),
      meta: {
        secure: false,
        layout: 'empty',
      }
    },
  ]
})

export default router
