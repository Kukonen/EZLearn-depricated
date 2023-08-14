import {Lesson, LessonTime, Professor} from "./common.types.ts";

export type ScheduleDayTitle =
    'SUNDAY' | 'MONDAY' |
    'TUESDAY' | 'WEDNESDAY' |
    'THURSDAY' | 'FRIDAY' |
    'SATURDAY';

export type ScheduleLessonType =
    'LECTURE' | // Лекция
    'SEMINAR' | // Семинар
    'LABORATORY_WORK' | // Лабораторная
    'COURSE_WORK' // Курсовая

export interface ScheduleLesson {
    id: string;
    titleId: string; // lesson: id
    type: ScheduleLessonType;
    lessonTimeOrder: number; // lessonTime: order
    professorsIds: string[]; // professor: id
}

export interface ScheduleLessonFormatter {
    id: string;
    titleId: string;
    title: string;
    type: string;
    lessonTime: string;
    professorsIds: string[];
    professors: string[];
}

export interface ScheduleDay {
    id: string;
    title: ScheduleDayTitle;
    lessons: ScheduleLesson[];
}

export interface ScheduleDayFormatter {
    id: string;
    title: string;
    lessons: ScheduleLessonFormatter[];
}

export interface BasicScheduleInformation {
    university: string;
    group: string;
    template: string;
}

export interface ScheduleInformation extends BasicScheduleInformation {
    id: string;
}

export interface scheduleSettingsCurrentProfessors {
    id: string;
    professors: Professor[];
}

export interface Schedule {
    scheduleInformation: ScheduleInformation,
    professors: Professor[],
    lessons: Lesson[],
    lessonTimes: LessonTime[],
    days: ScheduleDay[]
}