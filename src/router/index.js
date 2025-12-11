import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/shop', name: 'shop', component: () => import('../views/ShopView.vue') },
    { path: '/About', name: 'About', component: () => import('../views/AboutView.vue') },

  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
