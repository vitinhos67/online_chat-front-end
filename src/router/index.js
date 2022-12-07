import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/App.vue"),
  }, 
  {
    path: '/chat',
    name: "chat",
    component: () => import('../components/Chat.vue')
  }, {
    path: "/login",
    name: "signin/signup",
    component: () => import('../components/Login-Register.vue')
  }
 
];

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
