import { createRouter, createWebHashHistory } from "vue-router";
import Simulator from "@/views/Simulator.vue";
import AlgorithmDetails from "@/views/AlgorithmDetails";

const routes = [
  {
    path: "/",
    name: "Simulator",
    component: Simulator,
  },
  {
    path: "/info/:name",
    component: AlgorithmDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
