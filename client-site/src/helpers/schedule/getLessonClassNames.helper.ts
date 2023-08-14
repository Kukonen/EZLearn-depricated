import {ScheduleLessonType} from "../../types/schedule.types.ts";

export const getLessonTypeClasses = (type: ScheduleLessonType) => {
    let typeClasses = "schedule__day__lesson__type ";

    switch (type) {
        case "LECTURE":
            return typeClasses + 'schedule__day__lesson__type_lecture';
        case "SEMINAR":
            return typeClasses + 'schedule__day__lesson__type_seminar';
        case "LABORATORY_WORK":
            return typeClasses + 'schedule__day__lesson__type_laboratory-work';
        case "COURSE_WORK":
            return typeClasses + 'schedule__day__lesson__type_course-work';
    }
}