import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import PendingOrdersPage from '../views/PendingOrdersPage.vue'
import SummaryPage from '../views/SummaryPage.vue'
import ConfigurationsPage from '../views/ConfigurationsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import PatientDashboardPage from '@/views/PatientDashboardPage.vue'

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
    path: '/client_dashboard',
    name: 'PatientDashboard',
    component: PatientDashboardPage
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
