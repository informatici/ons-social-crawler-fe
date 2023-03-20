import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      label: 'Dashboard',
    },
    {
      path: '/youTube',
      name: 'youTube',
      component: () => import('../views/NavItemView.vue'),
      meta: {label: 'YouTube',},
    },
    {
      path: '/twitter',
      name: 'twitter',
      component: () => import('../views/NavItemView.vue'),
      meta: {label: 'Twitter',},
    },
    {
      path: '/twitch',
      name: 'twitch',
      component: () => import('../views/NavItemView.vue'),
      meta: {label: 'Twitch',},
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },

  ]
})

export default router
