import {RouteRecordRaw} from "vue-router";
import VChange from "../modules/change/views/VChange.vue";
import VChangeBasic from "../modules/change/views/VChangeBasic.vue";
import VChangeLessonTimes from "../modules/change/views/VChangeLessonTimes.vue";
import VChangeLessons from "../modules/change/views/VChangeLessons.vue";
import VChangeProfessors from "../modules/change/views/VChangeProfessors.vue";
import VChangeTemplate from "../modules/change/views/VChangeTemplate.vue";
import VChangeDays from "../modules/change/views/VChangeDays.vue";

const changeRouter: RouteRecordRaw[] = [
    {
        path: '/change',
        component: VChange,
        children: [
            {
                path: '',
                component: VChangeBasic
            },
            {
                path: 'template',
                component: VChangeTemplate
            },
            {
                path: 'professors',
                component: VChangeProfessors
            },
            {
                path: 'lessons',
                component: VChangeLessons
            },
            {
                path: 'times',
                component: VChangeLessonTimes
            },
            {
                path: 'days',
                component: VChangeDays
            }
        ]
    }
]

export default changeRouter;