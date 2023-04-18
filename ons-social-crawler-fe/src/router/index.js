import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/DashboardView.vue'
import { useAuthStore } from '../stores/auth'

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
      redirect: '/dashboard',
      component: () => import('../layouts/main-layout/MainLayout.vue'),
      meta: {
        middleware: 'auth'
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          meta: { label: 'Dashboard' }
          // label: 'Dashboard'
        },
        {
          path: '/youTube',
          name: 'youTube',
          component: () => import('../views/NavItemView.vue'),
          meta: { label: 'YouTube' }
        },
        {
          path: '/twitter',
          name: 'twitter',
          component: () => import('../views/NavItemView.vue'),
          meta: { label: 'Twitter' }
        },
        {
          path: '/twitch',
          name: 'twitch',
          component: () => import('../views/NavItemView.vue'),
          meta: { label: 'Twitch' }
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('../views/SettingsView.vue'),
          meta: { label: 'Impostazioni' }
        }
        // {
        //   path: '/login',
        //   name: 'login',
        //   component: () => import('../views/LoginView.vue'),
        // },
      ]
    },
    {
      path: '/',
      component: () => import('../layouts/AuthLayout.vue'),
      // component: () => import("@/views/LoginView.vue"),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
          meta: {
            pageTitle: 'Sign In'
          }
        }
        // {
        //   path: "/sign-up",
        //   name: "sign-up",
        //   component: () =>
        //       import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        //   meta: {
        //     pageTitle: "Sign Up",
        //   },
        // },
        // {
        //   path: "/password-reset",
        //   name: "password-reset",
        //   component: () =>
        //       import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        //   meta: {
        //     pageTitle: "Password reset",
        //   },
        // },
      ]
    }

    // {
    //   path: "/",
    //   component: () => import("@/layouts/SystemLayout.vue"),
    //   children: [
    //     {
    //       // the 404 route, when none of the above matches
    //       path: "/404",
    //       name: "404",
    //       component: () => import("@/views/crafted/authentication/Error404.vue"),
    //       meta: {
    //         pageTitle: "Error 404",
    //       },
    //     },
    //     {
    //       path: "/500",
    //       name: "500",
    //       component: () => import("@/views/crafted/authentication/Error500.vue"),
    //       meta: {
    //         pageTitle: "Error 500",
    //       },
    //     },
    //   ],
    // },
    // {
    //   path: "/:pathMatch(.*)*",
    //   redirect: "/404",
    // },
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  // const configStore = useConfigStore();

  // current page view title
  // document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  // configStore.resetLayoutConfig();

  // verify auth token before each page change
  await authStore.verifyAuth()

  // before page access check if page requires authentication
  if (to.meta.middleware == 'auth') {
    if (authStore.isAuthenticated) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
})

export default router
