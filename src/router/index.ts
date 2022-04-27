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
import OrdersPage from '@/views/OrdersPage.vue'
import ViewOrderPage from '@/views/ViewOrderPage.vue'
import PressOrderPage from '@/views/PressOrderPage.vue'
import ViewResultsPage from '@/views/ViewResultsPage.vue'
import ViewResultsViewOrderPage from '@/views/ViewResultsViewOrderPage.vue'
import UploadResultsViewOrderPage from '@/views/UploadResultsViewOrderPage.vue'
import UploadResultsPage from '@/views/UploadResultsPage.vue'

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
    component: RegisterPage,
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
    path: '/press_order',
    name: 'PressOrder',
    component: PressOrderPage
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersPage
  },
  {
    path: '/view_order',
    name: 'ViewOrder',
    component: ViewOrderPage
  },
  {
    path: '/view_results',
    name: 'ViewResults',
    component: ViewResultsPage
  },
  {
    path: '/view_results_view_order',
    name: 'ViewResultsViewOrder',
    component: ViewResultsViewOrderPage
  },
  {
    path: '/upload_results_view_order',
    name: 'UploadResultsViewOrder',
    component: UploadResultsViewOrderPage
  },
  {
    path: '/upload_results',
    name: 'UploadResults',
    component: UploadResultsPage
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
