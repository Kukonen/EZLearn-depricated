<script setup lang="ts">
import {ScheduleLessonFormatter} from "../../../../types/schedule.types.ts";
import {computed, ref, toRefs} from "vue";
import CHeading from "../../../../components/CHeading.vue";
import CSelect from "../../../../components/CSelect.vue";
import {Professor} from "../../../../types/common.types.ts";
import {useStore} from "vuex";
import {SelectItem} from "../../../../types/elemets.ts";
import {
    convertLessonToSelectItems,
    convertProfessorsToSelectItems,
    convertTypesToSelectItems
} from "../../../../helpers/schedule/schedule.helper.ts";
import CChangeAdd from "../CChangeAdd.vue";
import CChangeLessonProfessor from "../CChangeLessonProfessor.vue";

const props = defineProps<{
    lesson: ScheduleLessonFormatter
}>();

const store = useStore();

const LESSON_DEFAULT_TITLE = 'Выберете Занятие';

const {lesson} = toRefs(props);
const lessonTitles:SelectItem[] = [
    {
        key: LESSON_DEFAULT_TITLE,
        text: LESSON_DEFAULT_TITLE
    },
    ...convertLessonToSelectItems(store.getters["scheduleSettings/getLessons"])
];

const currentLesson = ref<string>(lesson.value.title);

const selectLesson = (key: string, text: string) => {
    store.commit('scheduleSettings/setLessonTitleByLessonId',
        {
            lessonId: lesson.value.id,
            lessonKey: key
        },
    )
    currentLesson.value = text;
}

const TYPE_DEFAULT_TITLE = 'Лекция';

const typesTitles:SelectItem[] = [
    ...convertTypesToSelectItems(['Лекция', 'Семинар', 'Лабораторная работа', 'Курсовая работа'])
];

const currentType = ref<string>(lesson.value.type);

const selectType = (key: string, text: string) => {
    store.commit('scheduleSettings/setLessonTypeByLessonId',
        {
            lessonId: lesson.value.id,
            lessonType: text
        },
    )
    currentType.value = text;
}

const PROFESSOR_DEFAULT_TITLE = 'Выберете Преподавателя';
const professors = ref<Professor[]>([]);
const professorAlreadySelected = computed(() => store.getters['scheduleSettings/getAlreadySelectedProfessors'](lesson.value.id))
const professorsTitles: SelectItem[] = [
    {
        key: PROFESSOR_DEFAULT_TITLE,
        text: PROFESSOR_DEFAULT_TITLE
    },
    ...convertProfessorsToSelectItems(store.getters["scheduleSettings/getProfessors"])
]

const currentProfessor = ref<Professor>({
    id: PROFESSOR_DEFAULT_TITLE,
    name: PROFESSOR_DEFAULT_TITLE
});

const addProfessor = () => {
    if (!(currentProfessor.value.name === PROFESSOR_DEFAULT_TITLE)) {

        store.commit('scheduleSettings/pushProfessor', {
            lessonId: lesson.value.id,
            professorId: currentProfessor.value.id
        })

        currentProfessor.value.name = PROFESSOR_DEFAULT_TITLE;
    }
}

const selectProfessor = (key: string, text: string) => {
    currentProfessor.value = {
        id: key,
        name: text
    };
}

const removeAlreadySelectedProfessor = (id: string, name: string) => {
    store.commit('scheduleSettings/popProfessor', {
        lessonId: lesson.value.id,
        professorId: id
    })
}

</script>

<template>
    <div>
        <c-heading type="SMALL">
            Занятие # {{lesson.lessonTime}}
        </c-heading>

        <div class="change__days__lesson__section">
            <c-select
                :id="`change_day_lesson_${lesson.id}_select`"
                :select="selectLesson"
                :placeholder="currentLesson"
                :selected-items="lessonTitles"
            />

            <c-select
                :id="`change_day_type_${lesson.id}_select`"
                :select="selectType"
                :placeholder="currentType"
                :selected-items="typesTitles"
            />

            <c-select
                :id="`change_day_professor_${lesson.id}_select`"
                :select="selectProfessor"
                :placeholder="currentProfessor.name"
                :selected-items="professorsTitles"
            />

            <c-change-lesson-professor
                v-if="professors"
                v-for="professor in professors"
                :professor="professor"
            />

            <div>
                <c-change-add
                    :add="addProfessor"
                />
            </div>

            <c-change-lesson-professor
                v-for="alreadySelectedProfessor in professorAlreadySelected"
                :key="alreadySelectedProfessor.id"
                :professor="alreadySelectedProfessor"
                :removeProfessor="removeAlreadySelectedProfessor"
            />
        </div>

    </div>


</template>

<style scoped lang="scss">
@import "src/styles/mixins/position.in.block";

.change__days__lesson__section {
    @include centralize-selects;
}

</style>