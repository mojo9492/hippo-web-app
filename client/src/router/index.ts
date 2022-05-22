import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/log",
    name: "homeLog",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/LogView.vue"),
  },
  {
    path: "/patients",
    name: "myPatients",
    component: () => import("@/views/PatientsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  // * prevent the user from navigating to server routes
  if (to.path.startsWith("/api")) {
    return router.push("/");
  }
});
export default router;
