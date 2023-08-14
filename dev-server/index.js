const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const applicants = [
    {
        university: "ГУАП",
        programPlaces: 30,
        programName: "ИВТ",
        educationForm: "FULL_TIME",
        paymentType: "TARGETED",
        score: 272,
        priority: 1,
        certificateSubmitted: false
    },
    {
        university: "ГУАП",
        programPlaces: 20,
        programName: "ПрогИнж",
        educationForm: "FULL_TIME",
        paymentType: "TARGETED",
        score: 272,
        priority: 0,
        certificateSubmitted: false
    },
    {
        university: "ВОЕНМЕХ",
        programPlaces: 70,
        programName: "ИВТ",
        educationForm: "FULL_TIME",
        paymentType: "TARGETED",
        score: 282,
        priority: 0,
        certificateSubmitted: true
    }
]

const scheduleInformation = {
    id: 'schedule_id_1337',
    university: 'University1',
    group: 'U1Groupkey1',
    template: 'G1Templatekey1'
}

const professors = [
    {
        id: 'professor_1',
        name: 'Иванович'
    },
    {
        id: 'professor_2',
        name: 'Сидорович'
    },
    {
        id: 'professor_3',
        name: 'Кочин'
    },
    {
        id: 'professor_4',
        name: 'Второй Кочин'
    },
    {
        id: 'professor_5',
        name: 'Иван Иванов Иванович'
    },
    {
        id: 'professor_6',
        name: 'СерГей'
    },
    {
        id: 'professor_7',
        name: 'Павел Павлович Биглер'
    }
]

const lessons = [
    {
        id: 'lesson_1',
        title: 'Физика'
    },
    {
        id: 'lesson_2',
        title: 'Информатика'
    },
    {
        id: 'lesson_3',
        title: 'ИВТ'
    },
    {
        id: 'lesson_4',
        title: 'Философия Павла Павловича Биглера'
    },
    {
        id: 'lesson_5',
        title: 'Журналистика, средства массовой коммуникации и коммуникация'
    }
]

const lessonTimes = [
    {
        order: 1,
        timeStart: '9:00',
        timeEnd: '10:30'
    },
    {
        order: 2,
        timeStart: '11:00',
        timeEnd: '12:30'
    },
    {
        order: 3,
        timeStart: '13:00',
        timeEnd: '14:30'
    },
    {
        order: 4,
        timeStart: '15:00',
        timeEnd: '16:30'
    },
    {
        order: 5,
        timeStart: '17:00',
        timeEnd: '18:30'
    },
    {
        order: 6,
        timeStart: '19:00',
        timeEnd: '20:30'
    }
]

const days = [
    {
        id: 'day_1',
        title: 'MONDAY',
        lessons: [
            {
                id: 'lesson_1',
                titleId: 'lesson_5',
                type: 'LECTURE',
                lessonTimeOrder: 3,
                professorsIds: ['professor_3']
            },
        ]
    },
    {
        id: 'day_2',
        title: 'TUESDAY',
        lessons: [
            {
                id: 'l312fdsf',
                titleId: 'lesson_10000',
                type: 'LECTURE',
                lessonTimeOrder: 100,
                professorsIds: []
            },
            {
                id: 'lesssd1211333',
                titleId: 'lesson_1',
                type: 'LABORATORY_WORK',
                lessonTimeOrder: 1,
                professorsIds: ['professor_1', 'professor_2']
            },
        ]
    },
    {
        id: 'day_3',
        title: 'WEDNESDAY',
        lessons: [
            {
                id: 'ldf12sdfFD',
                titleId: 'lesson_1',
                type: 'LECTURE',
                lessonTimeOrder: 1,
                professorsIds: ['professor_1']
            },
            {
                id: 'ledsf213s1',
                titleId: 'lesson_2',
                type: 'LECTURE',
                lessonTimeOrder: 2,
                professorsIds: ['professor_2']
            },
            {
                id: 'lsds3',
                titleId: 'lesson_3',
                type: 'LECTURE',
                lessonTimeOrder: 3,
                professorsIds: ['professor_3']
            },
            {
                id: 'lesfdfdgf3',
                titleId: 'lesson_3',
                type: 'SEMINAR',
                lessonTimeOrder: 4,
                professorsIds: ['professor_4']
            },
            {
                id: 'les321sdf',
                titleId: 'lesson_5',
                type: 'LABORATORY_WORK',
                lessonTimeOrder: 5,
                professorsIds: ['professor_5']
            },
            {
                id: 'ldf123',
                titleId: 'lesson_5',
                type: 'SEMINAR',
                lessonTimeOrder: 6,
                professorsIds: ['professor_6']
            },
        ]
    },
    {
        id: 'day_4',
        title: 'THURSDAY',
        lessons: [
            {
                id: 'ldfd213',
                titleId: 'lesson_4',
                type: 'COURSE_WORK',
                lessonTimeOrder: 6,
                professorsIds: ['professor_7']
            },
        ]
    },
    {
        id: 'day_5',
        title: 'FRIDAY',
        lessons: [
            {
                id: 'lfd12',
                titleId: 'lesson_3',
                type: 'LECTURE',
                lessonTimeOrder: 4,
                professorsIds: ['professor_1', 'professor_2']
            },
            {
                id: 'dfe31232',
                titleId: 'lesson_1',
                type: 'SEMINAR',
                lessonTimeOrder: 1,
                professorsIds: ['professor_2', 'professor_2']
            },
        ]
    },
    {
        id: 'day_6',
        title: 'SATURDAY',
        lessons: [
            {
                id: '2edfd3',
                titleId: 'lesson_1',
                type: 'LECTURE',
                lessonTimeOrder: 2,
                professorsIds: ['professor_2']
            },
            {
                id: '42123',
                titleId: 'lesson_2',
                type: 'LABORATORY_WORK',
                lessonTimeOrder: 3,
                professorsIds: ['professor_1', 'professor_2', 'professor_3', 'professor_4', 'professor_5', 'professor_6']
            },
            {
                id: '4134',
                titleId: 'lesson_3',
                type: 'SEMINAR',
                lessonTimeOrder: 4,
                professorsIds: ['professor_1', 'professor_2']
            },
        ]
    },
    {
        id: 'day_7',
        title: 'SUNDAY',
        lessons: [
            {
                id: 'fd2421',
                titleId: 'lesson_5',
                type: 'LECTURE',
                lessonTimeOrder: 1,
                professorsIds: ['professor_6', 'professor_5']
            },
        ]
    }
]

app.get('/api/v1/schedule/:id', (req, res, next) => {
    if (req.params.id === 'schedule_id_1337') {
        res.send({
            status: 'ok',
            scheduleInformation,
            days,
            lessonTimes,
            lessons,
            professors
        })
    } else {
        res.send({
            status: 'ok'
        })
    }
    
})

app.get('/api/v1/schedule/settings/basic/university', (req, res, next) => {
    res.send({
        status: 'ok',
        university: [{text: 'University1', key: 'Universitykey1'}, {text: 'University2', key: 'Universitykey2'}, {text: 'University3', key: 'Universitykey3'}]
    })
})

app.get('/api/v1/schedule/settings/basic/group/Universitykey1', (req, res, next) => {
    res.send({
        status: 'ok',
        group: [{text: 'U1 Group1', key: 'U1Groupkey1'}, {text: 'U1 Group2', key: 'U1Groupkey2'}, {text: 'U1 Group3', key: 'U1Groupkey3'}]
    })
})

app.get('/api/v1/schedule/settings/basic/group/Universitykey2', (req, res, next) => {
    res.send({
        status: 'ok',
        group: [{text: 'U2 Group1', key: 'U2Groupkey1'}, {text: 'U2 Group2', key: 'U2Groupkey2'}, {text: 'U2 Group3', key: 'U2Groupkey3'}]
    })
})

app.get('/api/v1/schedule/settings/basic/template/U1Groupkey1', (req, res, next) => {
    res.send({
        status: 'ok',
        template: [{text: 'G1 Template1', key: 'G1Templatekey1'}, {text: 'G1 Template2', key: 'G1Templatekey2'}, {text: 'G1 Template3', key: 'G1Templatekey3'}]
    })
})

app.get('/api/v1/schedule/settings/basic/template/U1Groupkey2', (req, res, next) => {
    res.send({
        status: 'ok',
        template: [{text: 'G2 Template1', key: 'G2Templatekey1'}, {text: 'G2 Template2', key: 'G2Templatekey2'}, {text: 'G2 Template3', key: 'G2Templatekey3'}]
    })
})

app.post('/api/v1/schedule/settings/basic/select', (req, res, next) => {
    res.json({
        status: 'ok',
        scheduleInformation: {
            id: 'schedule_id_1337',
            university: req.body.university,
            group: req.body.group,
            template: req.body.template
        }
    })
})

const PORT = 3030;

app.listen(PORT, () => {
    console.log(`App started at ${PORT}`)
})