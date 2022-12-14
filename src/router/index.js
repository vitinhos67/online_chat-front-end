import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/chat/:id",
    name: "chatConnected",
    component: () => import("../components/ConnectedChat.vue"),
  },
  {
    path: "/",
    name: "chat",
    component: () => import("../components/Chat.vue"),
  },
  {
    path: "/login",
    name: "signin",
    component: () => import("../components/LoginVue.vue"),
  },
  {
    path: "/register",
    name: "signup",
    component: () => import("../components/RegisterVue.vue"),
  },
  {
    path: "/chat",
    redirect: "/",
  },
  {
    path: "/profile/change",
    name: "Change Profile",
    component: () => import("../components/ProfileChange.vue"),
  },
];

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
