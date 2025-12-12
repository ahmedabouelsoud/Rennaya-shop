import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { getAuth } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/shop', name: 'shop', component: () => import('../views/ShopView.vue') },
    { path: '/About', name: 'About', component: () => import('../views/AboutView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    {path: '/admin',name: 'admin',component: () => import('../views/AdminView.vue'),meta: { requiresAuth: true }},

  ],
  scrollBehavior() {
    return { top: 0 };
  }
});
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); 


  if (requiresAuth && !auth.currentUser) {
    next({ name: 'login' });
  } else if (!requiresAuth && auth.currentUser && to.name === 'login') {
    next({ name: 'admin' });
  } else {
    next();
  }
});
export default router;
