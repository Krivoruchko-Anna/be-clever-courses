import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import CoursesPage from '@/views/CoursesPage.vue'
import PublicOfferPage from '@/views/PublicOfferPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
    },
    {
      path: '/courses',
      name: 'CoursesPage',
      component: CoursesPage,
    },
    {
      path: '/public-offer',
      name: 'PublicOfferPage',
      component: PublicOfferPage,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

export default router
