import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import SearchOrRegisterPage from '../views/SearchOrRegisterPage.vue'
import PendingOrdersPage from '../views/PendingOrdersPage.vue'
import SummaryPage from '../views/SummaryPage.vue'
import ConfigurationsPage from '../views/ConfigurationsPage.vue'
import LoginPage from '../views/LoginPage.vue'

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
    path: '/search_or_register',
    name: 'SearchOrRegister',
    component: SearchOrRegisterPage
  },
  {
    path: '/summary',
    name: 'Summary',
    component: SummaryPage
  },
  {
    path: '/pending_orders',
    name: 'PendingOrders',
    component: PendingOrdersPage
  },
  {
    path: '/configurations',
    name: 'Configurations',
    component: ConfigurationsPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
