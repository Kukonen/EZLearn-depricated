export interface Professor {
    id: string;
    name: string;
}

export interface Lesson {
    id: string;
    title: string;
}

export interface LessonTime {
    order: number;
    timeStart: string;
    timeEnd: string;
}