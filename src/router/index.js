import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Dashboard from '../views/dashboard.vue';
import ProductList from '../views/ProductList.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard.vue')
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/edit-product',
    name: 'EditProduct',
    component: Dashboard,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
