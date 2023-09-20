import {RouteRecordRaw} from "vue-router";
import VAuth from "../modules/auth/views/VAuth.vue";
import VLogin from "../modules/auth/views/VLogin.vue";
import VRegister from "../modules/auth/views/VRegister.vue";

const authRouter: RouteRecordRaw[] = [
    {
        path: '/auth',
        component: VAuth,
        children: [
            {
                path: 'login',
                component: VLogin
            },
            {
                path: 'register',
                component: VRegister
            }
        ]
    }

]

export default authRouter;