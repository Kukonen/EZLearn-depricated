import {createStore} from 'vuex';
import schedule from "./modules/schedule.ts";
import scheduleSettings from "./modules/scheduleSettings.ts";
import toast from "./modules/toast.ts";

const store = createStore({
    modules: {
        schedule: schedule,
        scheduleSettings: scheduleSettings,
        toast: toast
    }
})

export default store;