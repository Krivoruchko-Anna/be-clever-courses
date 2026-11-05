import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import CoursesPage from '@/views/CoursesPage.vue'
import ContactsPage from '@/views/ContactsPage.vue'
import PublicOfferPage from '@/views/PublicOfferPage.vue'
import PersonalDataPolicyPage from '@/views/PersonalDataPolicyPage.vue'
import PayResultPage from '@/views/PayResultPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      path: '/contacts',
      name: 'ContactsPage',
      component: ContactsPage,
    },
    {
      path: '/public-offer',
      name: 'PublicOfferPage',
      component: PublicOfferPage,
    },
    {
      path: '/personal-data-policy',
      name: 'personal-data-policy',
      component: PersonalDataPolicyPage,
    },
    {
      path: '/pay-result',
      name: 'PayResultPage',
      component: PayResultPage,
    },
  ],
  scrollBehavior(to) {
    if (to.hash === '#app-form') {
      return false
    }

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
