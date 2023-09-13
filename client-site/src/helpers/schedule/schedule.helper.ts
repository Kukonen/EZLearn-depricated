import {
    ScheduleDay,
    ScheduleDayFormatter,
    ScheduleDayTitle, ScheduleLesson,
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

// функция заполняет день пустыми занятиями
export function sortAndFillDays(days: ScheduleDay[], lessonsCount: number): ScheduleDay[] {

    const daysWithSortedLessons: ScheduleDay[] = days.map(day => {
        day.lessons = sortLessons(day.lessons);

        return day;
    })

    const fillerLessonFunction = (lessons: ScheduleLesson[], lessonsCount: number): ScheduleLesson[] => {
        let filledLessons: ScheduleLesson[] = [];

        for (let i = 0; i < lessonsCount; ++i) {
            const lesson = lessons.find(l =>
                l.lessonTimeOrder === i + 1 &&
                l.week.includes("odd") && l.week.includes("even")
            );

            if (lesson) {
                filledLessons.push(lesson);
                continue;
            }

            const lessonOdd = lessons.find(l =>
                l.lessonTimeOrder === i + 1 &&
                l.week.includes("odd")
            );

            const lessonEven = lessons.find(l =>
                l.lessonTimeOrder === i + 1 &&
                l.week.includes("even")
            );

            if (lessonOdd && lessonEven) {
                filledLessons.push(lessonOdd);
                filledLessons.push(lessonEven)
            } else if (lessonOdd) {
                filledLessons.push(lessonOdd)
                filledLessons.push({
                    id: generateRandomString(),
                    titleId: '', // lesson: id
                    type: 'LECTURE',
                    lessonTimeOrder: i + 1, // lessonTime: order
                    professorsIds: [],
                    week: ['even']
                });
            } else if (lessonEven) {
                filledLessons.push(lessonEven)
                filledLessons.push({
                    id: generateRandomString(),
                    titleId: '', // lesson: id
                    type: 'LECTURE',
                    lessonTimeOrder: i + 1, // lessonTime: order
                    professorsIds: [],
                    week: ['odd']
                });
            } else {
                filledLessons.push({
                    id: generateRandomString(),
                    titleId: '', // lesson: id
                    type: 'LECTURE',
                    lessonTimeOrder: i + 1, // lessonTime: order
                    professorsIds: [],
                    week: ['odd']
                });
                filledLessons.push({
                    id: generateRandomString(),
                    titleId: '', // lesson: id
                    type: 'LECTURE',
                    lessonTimeOrder: i + 1, // lessonTime: order
                    professorsIds: [],
                    week: ['even']
                });

            }


        }

        return filledLessons;
    };

    return daysWithSortedLessons.map(day => {
        day.lessons = fillerLessonFunction(day.lessons, lessonsCount);

        return day;
    })
}

export function fillEmptyDays(lessonsCount: number): ScheduleDay[] {
    let days: ScheduleDay[] = [];

    let daysTitlesNotFormatter:ScheduleDayTitle[] = [
        'MONDAY', 'TUESDAY', 'WEDNESDAY',
        'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
    ];

    for(let i = 0; i < daysTitlesNotFormatter.length; ++i) {
        let lessons: ScheduleLesson[] = [];

        for (let j = 0; j < lessonsCount; ++j) {
            lessons.push({
                id: generateRandomString(),
                titleId: '', // lesson: id
                type: 'LECTURE',
                lessonTimeOrder: j + 1, // lessonTime: order
                professorsIds: [],
                week: ['odd']
            });
            lessons.push({
                id: generateRandomString(),
                titleId: '', // lesson: id
                type: 'LECTURE',
                lessonTimeOrder: j + 1, // lessonTime: order
                professorsIds: [],
                week: ['even']
            })
        }

        const day: ScheduleDay = {
            id: generateRandomString(),
            title: daysTitlesNotFormatter[i],
            lessons
        }

        days.push(day);
    }

    return days;
}

export function fillAndConvertDays(days: ScheduleDay[], professors: Professor[], lessonTimes: LessonTime[], lessons: Lesson[]): ScheduleDayFormatter[] {
    if (days.length > 0) {
        return convertScheduleDayToScheduleDayFormatter(
            sortAndFillDays(days, lessonTimes.length),
            professors,
            lessonTimes,
            lessons
        )
    } else {
        return convertScheduleDayToScheduleDayFormatter(
            fillEmptyDays(lessonTimes.length),
            professors,
            lessonTimes,
            lessons
        )
    }
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