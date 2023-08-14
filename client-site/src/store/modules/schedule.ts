import {
    ScheduleInformation,
    ScheduleDay,
    ScheduleDayFormatter,
    Schedule
} from "../../types/schedule.types.ts";
import {request} from "../../utils/request.ts";
import {
    convertScheduleDayToScheduleDayFormatter,
} from "../../helpers/schedule/schedule.helper.ts";
import {Lesson, LessonTime, Professor} from "../../types/common.types.ts";

const schedule = {
    state: ():{
        scheduleInformation: ScheduleInformation | undefined,
        professors: Professor[],
        lessons: Lesson[],
        lessonTimes: LessonTime[],
        days: ScheduleDay[]
    } => ({
        scheduleInformation: undefined,
        professors: [],
        lessons: [],
        lessonTimes: [],
        days: []
    }),
    getters: {
        getScheduleInformation(state:any) {
            return state.scheduleInformation;
        },
        getProfessors(state:any) {
            return state.professors;
        },
        getLessons(state:any) {
            return state.lessons;
        },
        getLessonTimes(state:any) {
            return state.lessonTimes;
        },
        getDays(state: any) {
            return state.days;
        },
        getDaysFormatter(state:any, getters: any) : ScheduleDayFormatter[] {
            const professors = getters.getProfessors;
            const lessons = getters.getLessons;
            const lessonTimes = getters.getLessonTimes;

            const days = getters.getDays;
            if(days && professors && lessonTimes && lessons) {
                return convertScheduleDayToScheduleDayFormatter(days, professors, lessonTimes, lessons);
            } else {
                return [];
            }

        }
    },
    mutations: {
        setScheduleInformation(state:any, scheduleInformation:ScheduleInformation) {
            state.scheduleInformation = scheduleInformation;
        },
        setProfessors(state:any, professors:Professor[]) {
            state.professors = professors;
        },
        setLessons(state:any, lessons:Lesson[]) {
            state.lessons = lessons;
        },
        setLessonTimes(state:any, lessonTimes:LessonTime[]) {
            state.lessonTimes = lessonTimes;
        },
        setDays(state:any, days:ScheduleDay[]) {
            state.days = days;
        }
    },
    actions: {
        selectSchedule({commit}, scheduleInformation: ScheduleInformation) {
            commit('setScheduleInformation', scheduleInformation);

            localStorage.setItem('schedule', JSON.stringify({scheduleInformation}));
        },
        async fetchScheduleById({state, commit}, id) {
            const { scheduleInformation, professors, lessons, lessonTimes, days }
                = await request(`/v1/schedule/${id}`);

            if (scheduleInformation && professors && lessons && lessonTimes && days) {
                commit('setScheduleInformation', scheduleInformation);
                commit('setProfessors', professors);
                commit('setLessons', lessons);
                commit('setLessonTimes', lessonTimes);
                commit('setDays', days);
            }
        },

        async fetchSchedule({commit, dispatch}) {
            const scheduleString = localStorage.getItem('schedule');

            if (scheduleString) {
                const { scheduleInformation, professors, lessons, lessonTimes, days } = JSON.parse(scheduleString);

                commit('setScheduleInformation', scheduleInformation);
                commit('setProfessors', professors);
                commit('setLessons', lessons);
                commit('setLessonTimes', lessonTimes);
                commit('setDays', days);

                if (scheduleInformation.id) {
                    dispatch('fetchScheduleById', scheduleInformation.id)
                }
            }
        },

        saveSchedule({commit}, schedule: Schedule) {
            const { scheduleInformation, professors, lessons, lessonTimes, days }
                = schedule;

            commit('setScheduleInformation', scheduleInformation);
            commit('setProfessors', professors);
            commit('setLessons', lessons);
            commit('setLessonTimes', lessonTimes);
            commit('setDays', days);

            localStorage.setItem('schedule', JSON.stringify(schedule));
        }
    },
    namespaced: true
}

export default schedule;