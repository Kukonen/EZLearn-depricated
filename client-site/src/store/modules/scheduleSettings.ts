import {
    ScheduleInformation,
    ScheduleDay,
    ScheduleDayFormatter,
    scheduleSettingsCurrentProfessors, Schedule
} from "../../types/schedule.types.ts";
import {Lesson, LessonTime, Professor} from "../../types/common.types.ts";
import {generateRandomString, parseFromLocalStorage} from "../../helpers/helpFunctions.helper.ts";
import {
    contactProfessor,
    convertProfessorsToSelectItems, convertScheduleDayFormatterToScheduleDay,
    fillAndConvertDays
} from "../../helpers/schedule/schedule.helper.ts";

const scheduleSettings = {
    state: (): {
        scheduleInformation: ScheduleInformation | undefined,
        professors: Professor[],
        lessons: Lesson[],
        lessonTimes: LessonTime[],
        days: ScheduleDay[],
        dayFormatter: ScheduleDayFormatter[],
        currentDayTitle: string,
        currentProfessors: scheduleSettingsCurrentProfessors[]
    } => ({
        scheduleInformation: undefined,
        professors: [],
        lessons: [],
        lessonTimes: [],
        days: [],
        dayFormatter: [],
        currentDayTitle: 'Понедельник',
        currentProfessors: []
    }),
    getters: {
        getScheduleInformation(state: any) {
            return state.scheduleInformation;
        },
        getProfessors(state: any) {
            return state.professors;
        },
        getLessonTimes(state: any) {
            return state.lessonTimes;
        },
        getLessons(state: any) {
            return state.lessons;
        },
        getDays(state: any) {
            return state.days;
        },
        getDayFromFormatterTitle(state: any) : ScheduleDayFormatter {
            const days = state.dayFormatter;

            return days.find((day:ScheduleDayFormatter) =>
                day.title === state.currentDayTitle);
        },
        getRemainingProfessorsLikeSelectedItems: (state: any) => (lessonId: string) => {
            const lessonIdx = state.currentProfessors.findIndex(lesson => lesson.id === lessonId);

            const remainingProfessors = state.professors.filter((professor: Professor) => {
                state.currentProfessors[lessonIdx].professors.forEach(currentProfessor => {
                    if (currentProfessor.id === professor.id) {
                        return false;
                    }
                })

                return true;
            })

            return convertProfessorsToSelectItems(remainingProfessors);
        },
        getAlreadySelectedProfessors: (state: any) => (lessonId: string) => {
            const lessonIdx = state.currentProfessors.findIndex(lesson => lesson.id === lessonId);

            return state.currentProfessors[lessonIdx].professors;
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
        },
        setDayFormatter(state: any, dayFormatter: ScheduleDayFormatter[]) {
            state.dayFormatter = dayFormatter;
        },
        setCurrentDayTitle(state: any, dayTitle: string) {
            state.currentDayTitle = dayTitle;
        },
        setCurrentProfessors(state: any, currentProfessors:scheduleSettingsCurrentProfessors[]) {
            state.currentProfessors = currentProfessors;
        },
        setLessonTitleByLessonId(state: any, {lessonId, lessonTitle}) {
            const days = state.dayFormatter
                .map((day:ScheduleDayFormatter) => {
                    const lessonIdx = day.lessons.findIndex(lesson => lesson.id === lessonId)
                    if (lessonIdx !== -1) {
                        day.lessons[lessonIdx].title = lessonTitle;
                    }
                    return day;
                });

            state.dayFormatter = days;
        },
        setTypeTitleByLessonId(state: any, {lessonId, typeTitle}) {
            const days = state.dayFormatter
                .map((day:ScheduleDayFormatter) => {
                    const lessonIdx = day.lessons.findIndex(lesson => lesson.id === lessonId)
                    if (lessonIdx !== -1) {
                        day.lessons[lessonIdx].type = typeTitle;
                    }
                    return day;
                });

            state.dayFormatter = days;
        },
        pushCurrentProfessor(state: any, {lessonId, professor}) {
            const lessonIdx = state.currentProfessors.findIndex(lesson => lesson.id === lessonId);

            let currentProfessorsFormatter = state.currentProfessors;

            currentProfessorsFormatter[lessonIdx].professors.push(professor);

            state.currentProfessors = currentProfessorsFormatter;
        },
        popCurrentProfessor(state: any, {lessonId, professor}) {
            const lessonIdx = state.currentProfessors.findIndex(lesson => lesson.id === lessonId);

            let currentProfessorsFormatter = state.currentProfessors;

            currentProfessorsFormatter[lessonIdx].professors = currentProfessorsFormatter[lessonIdx].professors
                .filter(formatterProfessor =>
                    formatterProfessor.id !== professor.id
                );

            state.currentProfessors = currentProfessorsFormatter;
        }
    },
    actions: {
        async collectSchedule({state, commit}) {
            const scheduleSettings = parseFromLocalStorage('scheduleSettings')

            if (scheduleSettings) {
                const { scheduleInformation, professors, lessons, lessonTimes, days }
                    = scheduleSettings;

                commit('setScheduleInformation', scheduleInformation);
                commit('setProfessors', professors);
                commit('setLessons', lessons);
                commit('setLessonTimes', lessonTimes);
                commit('setDays', days);
            }
        },
        async createFromCurrent({rootGetters, commit, dispatch}) {

            const schedule = parseFromLocalStorage('schedule');

            if (schedule) {
                if (schedule.scheduleInformation.id) {
                    await dispatch('schedule/fetchScheduleById', schedule.scheduleInformation.id, { root: true });
                }

                const scheduleInformation = rootGetters["schedule/getScheduleInformation"]
                const professors = rootGetters["schedule/getProfessors"];
                const lessons = rootGetters["schedule/getLessons"];
                const lessonTimes = rootGetters["schedule/getLessonTimes"];
                const days = rootGetters["schedule/getDays"];

                const id = generateRandomString();

                commit('setScheduleInformation', {
                    ...scheduleInformation,
                    id,
                    template: id
                });
                commit('setProfessors', professors);
                commit('setLessons', lessons);
                commit('setLessonTimes', lessonTimes);
                commit('setDays', days);

                localStorage.setItem('scheduleSettings', JSON.stringify({
                    scheduleInformation: {
                        ...scheduleInformation,
                        id,
                        template: id
                    },
                    professors,
                    lessons,
                    lessonTimes,
                    days
                }))
            }
        },

        async createEmpty({commit}) {
            const id = generateRandomString()

            commit('setScheduleInformation', {
                id,
                university: undefined,
                group: undefined,
                template: undefined
            })

            commit('setProfessors', [])
            commit('setLessons', [])
            commit('setLessonTimes', [])
            commit('setDays', [])

            localStorage.setItem('scheduleSettings', JSON.stringify({
                scheduleInformation: {
                    id,
                },
                professors: [],
                lessons: [],
                lessonTimes: [],
                days: []
            }));
        },
        // update localstorage
        async updateProfessors({state, dispatch}, professors:Professor[]) {
            const scheduleSettings = parseFromLocalStorage('scheduleSettings')

            if (scheduleSettings) {
                scheduleSettings.professors = professors.filter(
                    professor =>
                        professor.name !== ''
                );

                localStorage.setItem('scheduleSettings',
                    JSON.stringify(scheduleSettings))
            }
        },
        async updateLessonTimes({state, dispatch}, lessonTimes:LessonTime[]) {
            const scheduleSettings = parseFromLocalStorage('scheduleSettings')

            if (scheduleSettings) {
                scheduleSettings.lessonTimes = lessonTimes.filter(
                    lessonTime =>
                        lessonTime.timeStart !== '' &&
                        lessonTime.timeEnd !== ''
                );

                localStorage.setItem('scheduleSettings',
                    JSON.stringify(scheduleSettings))
            }
        },
        async updateLessons({state, dispatch}, lessons: Lesson[]) {
            const scheduleSettings = parseFromLocalStorage('scheduleSettings')

            if (scheduleSettings) {
                scheduleSettings.lessons = lessons.filter(
                    lesson =>
                        lesson.title !== ''
                );

                localStorage.setItem('scheduleSettings',
                    JSON.stringify(scheduleSettings))
            }
        },
        updateDays({state}) {
            const scheduleSettings = parseFromLocalStorage('scheduleSettings')

            let dayFormatter:ScheduleDayFormatter[] = state.dayFormatter;
            const currentProfessors:scheduleSettingsCurrentProfessors[] = state.currentProfessors;

            dayFormatter = dayFormatter.map(day => {
                day.lessons = day.lessons.map(lesson => {
                    const lessonIdx = currentProfessors
                        .findIndex(currentProfessor => currentProfessor.id === lesson.id)

                    lesson.professors = [];
                    lesson.professorsIds = [];

                    currentProfessors[lessonIdx].professors.forEach(currentProfessor => {
                        lesson.professors.push(currentProfessor.name);
                        lesson.professorsIds.push(currentProfessor.id);
                    })

                    return lesson;
                })

                return day;
            })

            const normalizedDay = convertScheduleDayFormatterToScheduleDay(dayFormatter, state.lessons);

            if (scheduleSettings) {
                scheduleSettings.days = normalizedDay;

                localStorage.setItem('scheduleSettings',
                    JSON.stringify(scheduleSettings))
            }
        },
        //
        serializeDays({commit, getters}) {
            const professors = getters.getProfessors;
            const lessons = getters.getLessons;
            const lessonTimes = getters.getLessonTimes;
            const days = getters.getDays;

            const formatterDays = fillAndConvertDays(days, professors, lessonTimes, lessons);

            let currentProfessors: scheduleSettingsCurrentProfessors[] = [];

            formatterDays.forEach(formatterDay => {
                formatterDay.lessons.forEach(lessonFormatter => {
                    currentProfessors.push({
                        id: lessonFormatter.id,
                        professors: contactProfessor(lessonFormatter.professorsIds, lessonFormatter.professors)
                    })
                })
            })
            commit('setDayFormatter', formatterDays);
            commit('setCurrentProfessors', currentProfessors);
        },
        saveInCurrent({state, dispatch}) {
            const scheduleInformation = state.scheduleInformation;
            const professors = state.professors;
            const lessons = state.lessons;
            const lessonTimes = state.lessonTimes;
            const days = state.days;

            const daysWithoutEmpty = days.reduce((newDays: ScheduleDay[], day: ScheduleDay) => {

                day.lessons = day.lessons.filter(lesson => {
                    return lesson.titleId || lesson.professorsIds.length > 0;
                })

                if (day.lessons.length > 0) {
                    newDays.push(day);
                }
                return newDays;
            }, [])

            const schedule:Schedule = {
                scheduleInformation,
                professors,
                lessons,
                lessonTimes,
                days: daysWithoutEmpty
            }

            dispatch('schedule/saveSchedule', schedule, { root: true })
        }
    },
    namespaced: true
}

export default scheduleSettings;