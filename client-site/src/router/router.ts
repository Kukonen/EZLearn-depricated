import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";
import VGreeting from "../modules/greeting/views/VGreeting.vue";
import userRouter from "./user.router.ts";
import scheduleRouter from "./schedule.router.ts";
import changeRouter from "./change.router.ts";

const routes: RouteRecordRaw[]= [
    {
        path: '/',
        component: VGreeting
    }
]

routes.push(...userRouter);
routes.push(...scheduleRouter);
routes.push(...changeRouter);

const router: Router = createRouter({
    routes,
    history: createWebHistory()
 })

export default router;