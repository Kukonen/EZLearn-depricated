<script setup lang="ts">

import {useStore} from "vuex";
import CHeading from "../../../components/CHeading.vue";
import {onMounted, ref} from "vue";
import CChangeProfessor from "../components/CChangeProfessor.vue";
import {Professor} from "../../../types/common.types.ts";
import CChangeAdd from "../components/CChangeAdd.vue";
import {generateRandomString} from "../../../helpers/helpFunctions.helper.ts";

const store = useStore();
const professors = ref<Professor[]>();

onMounted(() => {
    professors.value = store.getters["scheduleSettings/getProfessors"];
})

const remove = (id) => {
    professors.value =
        professors.value?.filter(
            (professor:Professor) =>
                professor.id !== id);
}

const add = () => {
    const emptyProfessor:Professor = {
        id: generateRandomString(),
        name: ''
    }

    if (professors.value?.find(professor => professor.name === '')) {
        store.dispatch('toast/doToast', {
            text: 'Заполните Всех Преподавателей',
            type: 'WARNING'
        })

        return;
    }

    professors.value?.push(emptyProfessor)
}

const save = () => {
    store.dispatch('scheduleSettings/updateProfessors', professors.value)
}


</script>

<template>

    <c-heading type="LARGE">
        Преподаватели
    </c-heading>

    <c-change-professor
        v-for="professor in professors"
        :professor="professor"
        :removeProfessor="remove"
    />

    <c-change-add :add="add" />
    <button @click="save">
        Сохранить
    </button>
</template>

<style scoped>

</style>