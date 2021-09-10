import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// error page components
const PAGE_403 = () => import('@/views/error/Page403.vue');
const PAGE_404 = () => import('@/views/error/Page404.vue');
const PAGE_500 = () => import('@/views/error/Page500.vue');

//backend commpoents
const ABOUT = () => import('@/views/about/About.vue');
const DASHBOARD = () => import('@/views/navbar/Dashboard.vue');

const routes = [
  // error pages
  { path: '/error/403', name: 'page403', component: PAGE_403 },
  { path: '/error/404', name: 'page404', component: PAGE_404 },
  { path: '/error/500', name: 'page500', component: PAGE_500 },

  { path: '/about', name: 'About', component: ABOUT },

  {
    path: '/',
    name: 'Dashboard',
    component: DASHBOARD
  },

  // catch all
  { path: '*', redirect: { name: 'page404' } }
]

const router = new VueRouter({
  routes
})

export default router
