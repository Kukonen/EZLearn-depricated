<script setup lang="ts">

import {useStore} from "vuex";
import {onMounted, ref} from "vue";
import {Lesson} from "../../../types/common.types.ts";
import {generateRandomString} from "../../../helpers/helpFunctions.helper.ts";
import CHeading from "../../../components/CHeading.vue";
import CChangeAdd from "../components/CChangeAdd.vue";
import CChangeLesson from "../components/CChangeLesson.vue";
import CButton from "../../../components/CButton.vue";

const store = useStore();
const lessons = ref<Lesson[]>()

onMounted(() => {
    lessons.value = store.getters["scheduleSettings/getLessons"];
})

const remove = (id) => {
    lessons.value =
        lessons.value?.filter(
            (lesson:Lesson) =>
                lesson.id !== id);
}

const add = () => {
    const emptyLesson: Lesson = {
        id: generateRandomString(),
        title: ''
    }

    if (lessons.value?.find(lesson => lesson.title === '')) {
        store.dispatch('toast/doToast', {
            text: 'Заполните Все Занятия',
            type: 'WARNING'
        })

        return;
    }

    lessons.value?.push(emptyLesson)
}

const save = () => {
    store.dispatch('scheduleSettings/updateLessons', lessons.value)
}

</script>

<template>
    <c-heading type="LARGE">
        Занятия
    </c-heading>

    <div class="change__lessons__list">
        <c-change-lesson
            v-for="lesson in lessons"
            :remove-lesson="remove"
            :lesson="lesson"
        />
    </div>

    <div class="change__lessons__buttons">
        <c-change-add :add="add" />
        <c-button type="common" @click="save">
            Сохранить
        </c-button>
    </div>
</template>

<style scoped lang="scss">

@import "src/styles/mixins/position.in.block";

.change__lessons__list {
    @include centralize-selects;
}

.change__lessons__buttons {
    @include centralize-buttons;
}

</style>