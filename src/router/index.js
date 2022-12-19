import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/chat/:id",
    name: "chatWithUser",
    component: () => import("../components/Chat.vue"),
  },
  {
    path: "/chat",
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
    path: "/",
    redirect: "/chat",
  },
  {
    path: "/profile/change",
    name: "Change Profile",
    component: () => import("../components/ProfileChange.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "Page Not Found",
    component: () => import("../components/Error-404-Page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
