import {
    ScheduleDay,
    ScheduleDayFormatter,
    ScheduleDayTitle,
    ScheduleLesson,
    ScheduleLessonFormatter,
    ScheduleLessonType
} from "../../types/schedule.types.ts";
import {Lesson, LessonTime, Professor} from "../../types/common.types.ts";
import {generateRandomString} from "../helpFunctions.helper.ts";
import {SelectItem} from "../../types/elemets.ts";

export const translateDayTitle = (day: ScheduleDayTitle) => {
    switch (day) {
        case "SUNDAY":
            return 'Воскресенье';
        case "MONDAY":
            return 'Понедельник';
        case "TUESDAY":
            return 'Вторник';
        case "WEDNESDAY":
            return 'Среда';
        case "THURSDAY":
            return 'Четверг';
        case "FRIDAY":
            return 'Пятница';
        case "SATURDAY":
            return 'Суббота';
    }

    return 'Неизвестный день'
}

export const translateDayTitleBack = (dayTitle: string) : ScheduleDayTitle => {
    switch (dayTitle) {
        case "Воскресенье":
            return 'SUNDAY';
        case "Понедельник":
            return 'MONDAY';
        case "Вторник":
            return 'TUESDAY';
        case "Среда":
            return 'WEDNESDAY';
        case "Четверг":
            return 'THURSDAY';
        case "Пятница":
            return 'FRIDAY';
        case "Суббота":
            return 'SATURDAY';
    }

    return 'MONDAY'
}

export const translateDayLessonDayTitle = (lessonDay: ScheduleLessonType) => {
    switch (lessonDay) {
        case "LECTURE":
            return 'Лекция';
        case "SEMINAR":
            return 'Семинар';
        case "LABORATORY_WORK":
            return 'Лабораторная работа';
        case "COURSE_WORK":
            return 'Курсовая работа';
    }
}

export const translateDayLessonDayTitleBack = (lessonDay: string): ScheduleLessonType => {
    switch (lessonDay) {
        case 'Лекция':
            return "LECTURE";
        case 'Семинар':
            return "SEMINAR";
        case 'Лабораторная работа':
            return "LABORATORY_WORK";
        case 'Курсовая работа':
            return "COURSE_WORK";
    }

    return "LECTURE";
}

export const scheduleMatchTitle = (id: string, lessons: Lesson[]) : string => {

    let titleFormatter = 'Нет названия';

    lessons.forEach(lesson => {
        if (lesson.id === id) {
            titleFormatter = lesson.title;
        }
    })

    return titleFormatter;
}

export const scheduleMatchProfessor = (id: string[], professors: Professor[]) : string[] => {

    const professorsFormatter: string[] = [];

    id.forEach(professorId => {
        const professor = professors.find(prof => prof.id === professorId)

        if (professor) {
            professorsFormatter.push(professor.name)
        }
    })

    return professorsFormatter.length ? professorsFormatter : ["Нет преподавателя"];
}

export const scheduleMatchLessonTime = (order: number, lessonTimes: LessonTime[]) : string => {
    let lessonTimesFormatter = 'Неизвестное время';

    lessonTimes.forEach(lessonTime => {
        if (lessonTime.order === order) {
            lessonTimesFormatter = lessonTime.order + " | " + lessonTime.timeStart + " - " + lessonTime.timeEnd;
        }
    })

    return lessonTimesFormatter;
}

export const scheduleMatchLessonTimeBack = (lessonTime: string) : number => {
    return Number(lessonTime.substring(0, lessonTime.indexOf(' ')));
}

export function convertScheduleDayToScheduleDayFormatter(days: ScheduleDay[], professors: Professor[], lessonTimes: LessonTime[], lessons: Lesson[]): ScheduleDayFormatter[] {
    return days.map((day:ScheduleDay) : ScheduleDayFormatter => {
        const lessonsFormatter = day.lessons.map(lesson => {
            let formatterLesson: ScheduleLessonFormatter = {
                id: lesson.id,
                type: translateDayLessonDayTitle(lesson.type),
                titleId: lesson.titleId,
                title: scheduleMatchTitle(lesson.titleId, lessons),
                professorsIds: lesson.professorsIds,
                professors: scheduleMatchProfessor(lesson.professorsIds, professors),
                lessonTime: scheduleMatchLessonTime(lesson.lessonTimeOrder, lessonTimes),
                week: lesson.week
            };

            return formatterLesson;
        })

        return {
            id: day.id,
            title: translateDayTitle(day.title),
            lessons: lessonsFormatter
        };
    });
}

export function convertScheduleDayFormatterToScheduleDay(days: ScheduleDayFormatter[], lessons: Lesson[]):ScheduleDay[] {
    return days.map(day => {
        const newDay: ScheduleDay = {
            id: day.id,
            title: translateDayTitleBack(day.title),
            lessons: day.lessons.map(lesson => {
                const titleId =
                    lessons.find(savedLessons =>
                        savedLessons.title ===  lesson.title
                    )?.id;

                const newLesson: ScheduleLesson = {
                    id: lesson.id,
                    titleId: titleId ? titleId : '',
                    type: translateDayLessonDayTitleBack(lesson.type),
                    lessonTimeOrder: scheduleMatchLessonTimeBack(lesson.lessonTime),
                    professorsIds: lesson.professorsIds,
                    week: lesson.week
                }

                return newLesson;
            })
        }

        return newDay;
    });
}

export function sortLessons(lessons: ScheduleLesson[]): ScheduleLesson[] {
    return lessons.sort(
        (lesson1, lesson2) =>
            lesson1.lessonTimeOrder - lesson2.lessonTimeOrder
    );
}

export function sortAndAddSkippedDays(days: ScheduleDay[]) : ScheduleDay[] {
    let daysTitlesNotFormatter:ScheduleDayTitle[] = [
        'MONDAY', 'TUESDAY', 'WEDNESDAY',
        'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
    ];

    // пробегаемся по массиву titles, сортируем + добавляем день если нет
    return daysTitlesNotFormatter.map(dayTitle => {
        return days.find(day => day.title === dayTitle) ??
            {
                id: generateRandomString(),
                title: dayTitle,
                lessons: []
            }
    })
}

export function sortAndAddSkippedLessons(lessons: ScheduleLesson[], lessonCount: number) : ScheduleLesson[] {
    const newLessons: ScheduleLesson[] = [];

    for(let order = 1; order <= lessonCount; ++order) {


        // есть ли одно занятие на обе недели
        const bothWeekLesson = lessons.find(
            lesson =>
                lesson.lessonTimeOrder === order &&
                lesson.week.includes('odd') &&
                lesson.week.includes('even')
        );

        if (bothWeekLesson) {
            newLessons.push(bothWeekLesson)

            continue;
        }

        // далее если есть занятие на чётную/нечётную неделю
        newLessons.push(
            lessons.find(
                lesson =>
                    lesson.lessonTimeOrder === order &&
                    lesson.week.includes('odd')
            ) ??
            {
                id: generateRandomString(),
                titleId: '', // lesson: id
                type: 'LECTURE',
                lessonTimeOrder: order, // lessonTime: order
                professorsIds: [],
                week: ['odd']
            }
        )

        newLessons.push(
            lessons.find(
                lesson =>
                    lesson.lessonTimeOrder === order &&
                    lesson.week.includes('even')
            ) ??
            {
                id: generateRandomString(),
                titleId: '', // lesson: id
                type: 'LECTURE',
                lessonTimeOrder: order, // lessonTime: order
                professorsIds: [],
                week: ['even']
            }
        )
    }

    return newLessons;
}

export function fillDays(days: ScheduleDay[], lessonsCount: number) : ScheduleDay[] {
    days = sortAndAddSkippedDays(days);

    for(let i = 0; i < days.length; ++i) {
        days[i].lessons = sortAndAddSkippedLessons(days[i].lessons, lessonsCount);
    }

    return days;
}

export function fillAndConvertDays(days: ScheduleDay[], professors: Professor[], lessonTimes: LessonTime[], lessons: Lesson[]): ScheduleDayFormatter[] {
    return convertScheduleDayToScheduleDayFormatter(
        fillDays(days, lessonTimes.length),
        professors,
        lessonTimes,
        lessons
    );
}

export function convertLessonToSelectItems(lessons: Lesson[]) : SelectItem[] {
    return  lessons.map(lesson => ({
        key: lesson.id,
        text: lesson.title
    }))
}

export function convertTypesToSelectItems(types: string[]) : SelectItem[] {
    return  types.map(type => ({
        key: type,
        text: type
    }))
}

export function convertProfessorsToSelectItems(professors: Professor[]): SelectItem[] {
    return professors.map(professor => ({
        key: professor.id,
        text: professor.name
    }))
}

export function contactProfessor(professorsIds: string[], professorsNames: string[]): Professor[] {
    if (professorsIds.length === professorsNames.length) {
        return professorsIds.map((professorsId, index) => ({
            id: professorsId,
            name: professorsNames[index]
        }))
    } else {
        return []
    }
}

export function clearEmptyDays(days: ScheduleDay[]) {
    return days.map((day: ScheduleDay) => {
        return {
            id: day.id,
            title: day.title,
            lessons: day.lessons.filter(lesson =>
                lesson.titleId || lesson.professorsIds.length > 0
            )
        };
    }).filter((day: ScheduleDay) =>
        day.lessons.length > 0
    )
}