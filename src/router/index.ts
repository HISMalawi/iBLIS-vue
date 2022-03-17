import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import OrderPage from '../views/OrderPage.vue'
import ResultsPage from '../views/ResultsPage.vue'
import PendingPage from '../views/PendingPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/order',
    name: 'Order',
    component: OrderPage
  },
  {
    path: '/results',
    name: 'Results',
    component: ResultsPage
  },
  {
    path: '/pending',
    name: 'Pending',
    component: PendingPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
