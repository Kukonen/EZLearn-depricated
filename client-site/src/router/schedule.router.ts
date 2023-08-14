import {RouteRecordRaw} from "vue-router";
import VSchedule from "../modules/schedule/views/VSchedule.vue";

const scheduleRouter:RouteRecordRaw[] = [
    {
        path: '/schedule',
        component: VSchedule
    }
]

export default scheduleRouter;