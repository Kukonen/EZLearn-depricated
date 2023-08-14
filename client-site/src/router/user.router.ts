import VProfile from "../modules/profile/views/VProfile.vue";
import {RouteRecordRaw} from "vue-router";


const userRouter: RouteRecordRaw[] = [
    {
        path: '/profile',
        component: VProfile
    }
]

export default userRouter;