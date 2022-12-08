import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "chatHome",
    component: () => import("../components/Chat.vue"),
  },
  {
    path: "/chat/:id",
    name: "chat",
    component: () => import("../components/ConnectedChat.vue"),
  },
  {
    path: "/login",
    name: "signin/signup",
    component: () => import("../components/Login-Register.vue"),
  },
];

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
