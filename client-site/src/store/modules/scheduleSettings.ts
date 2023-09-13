import {
    ScheduleInformation,
    ScheduleDay,
    ScheduleDayFormatter,
    Schedule, ScheduleLesson
} from "../../types/schedule.types.ts";
import {Lesson, LessonTime, Professor} from "../../types/common.types.ts";
import {generateRandomString, parseFromLocalStorage} from "../../helpers/helpFunctions.helper.ts";
import {
    fillAndConvertDays,
    translateDayLessonDayTitleBack,
} from "../../helpers/schedule/schedule.helper.ts";

const scheduleSettings = {
    state: (): {
        scheduleInformation: ScheduleInformation | undefined,
        professors: Professor[],
        lessons: Lesson[],
        lessonTimes: LessonTime[],
        days: ScheduleDay[],
        currentDayTitle: string
    } => ({
        scheduleInformation: undefined,
        professors: [],
        lessons: [],
        lessonTimes: [],
        days: [],
        currentDayTitle: 'Понедельник'
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
        getDaysFormatter(state: any): ScheduleDayFormatter[] {
            return fillAndConvertDays(state.days, state.professors, state.lessonTimes, state.lessons)
        },
        getDayFromFormatterTitle(state: any, getters: any) : ScheduleDayFormatter {
            const days = getters.getDaysFormatter;

            return days.find((day:ScheduleDayFormatter) =>
                day.title === state.currentDayTitle);
        },
        getAlreadySelectedProfessors: (state: any, getters: any) => (lessonId: string) => {
            let selectedProfessorsNames: string[] = [];

            getters.getDaysFormatter.forEach( (day: ScheduleDayFormatter) => {
                day.lessons.forEach(lesson => {
                    if (lesson.id === lessonId) {
                        selectedProfessorsNames = lesson.professors;
                    }
                })
            })

            return selectedProfessorsNames.map(selectedProfessorsName => {
                return state.professors.find((professor:Professor) =>
                    professor.name === selectedProfessorsName
                )
            }).filter(selectedProfessorsName => selectedProfessorsName);
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
        setCurrentDayTitle(state: any, dayTitle: string) {
            state.currentDayTitle = dayTitle;
        },
        setLessonTitleByLessonId(state: any, {lessonId, lessonKey}) {
            state.days = state.days
                .map((day:ScheduleDay) => {
                    const lessonIdx = day.lessons.findIndex(lesson => lesson.id === lessonId)
                    if (lessonIdx !== -1) {
                        day.lessons[lessonIdx].titleId = lessonKey;
                    }
                    return day;
                });
        },
        setLessonTypeByLessonId(state: any, {lessonId, lessonType}) {
            state.days = state.days
                .map((day:ScheduleDay) => {
                    const lessonIdx = day.lessons.findIndex(lesson => lesson.id === lessonId)
                    if (lessonIdx !== -1) {
                        day.lessons[lessonIdx].type = translateDayLessonDayTitleBack(lessonType);
                    }
                    return day;
                });
        },
        pushProfessor(state: any, {lessonId, professorId}) {
            state.days = state.days.map( (day: ScheduleDay) => {
                day.lessons = day.lessons.map(lesson => {
                    if (lesson.id === lessonId) {
                        lesson.professorsIds.push(professorId);
                    }

                    return lesson;
                })

                return day;
            })
        },
        popProfessor(state: any, {lessonId, professorId}) {
            state.days = state.days.map( (day: ScheduleDay) => {
                day.lessons = day.lessons.map(lesson => {
                    if (lesson.id === lessonId) {
                        lesson.professorsIds = lesson.professorsIds.filter(lessonProfessorId =>
                            lessonProfessorId !== professorId
                        );
                    }

                    return lesson;
                })

                return day;
            })
        },
        toggleWeek(state: any, {lessonId}) {
            state.days = state.days.map( (day: ScheduleDay) => {
                let index = day.lessons.findIndex(lesson =>
                    lesson.id === lessonId
                )

                if (index !== -1) {
                    let curLesson = day.lessons[index];
                    day.lessons.filter(les =>
                        les.lessonTimeOrder !== curLesson.lessonTimeOrder
                    )

                    day.lessons.push({
                        ...curLesson,
                        week: ['odd', 'even']
                    })
                }
                return day;
            })
        },
        deleteLesson(state: any, {lessonId}) {
            state.days = state.days.map( (day: ScheduleDay) => {
                day.lessons = day.lessons.map(lesson => {
                    if (lesson.id === lessonId) {
                        return {
                            id: generateRandomString(),
                            titleId: '',
                            type: 'LECTURE',
                            lessonTimeOrder: lesson.lessonTimeOrder,
                            professorsIds: [],
                            week: lesson.week
                        }
                    }

                    return lesson;
                })

                return day;
            })
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

            if (scheduleSettings) {
                scheduleSettings.days = state.days;

                localStorage.setItem('scheduleSettings',
                    JSON.stringify(scheduleSettings))
            }
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