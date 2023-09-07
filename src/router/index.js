import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import AllTask from "../pages/Task/AllTask.vue";
import CreateTask from "../pages/Task/CreateTask.vue";
import EditTask from "../pages/Task/EditTask.vue";

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "allTask",
      component: AllTask,
    },
    {
      path: "/createTask",
      name: "createTask",
      component: CreateTask,
    },
    {
      path: "/editTask/:id",
      name: "editTask",
      component: EditTask,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
