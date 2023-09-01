<script setup lang="ts">
import {Professor} from "../../../types/common.types.ts";
import {toRefs} from "vue";
import TrashImage from '../../../assets/trash.svg';
import CButton from "../../../components/CButton.vue";

const props = defineProps<{
    professor: Professor,
    removeProfessor: (id: string) => void
}>();

const { professor } = toRefs(props);
const {removeProfessor} = props;

const remove = () => {
    removeProfessor(professor.value.id);
}

</script>

<template>
    <div :key="professor.id">
        <input
            type="text"
            placeholder="Имя/ФИО Преподавателя"
            :value="professor.name"
            @input="event => professor.name = event.target.value"
        >
        <c-button
            type="common"
            @click="remove"
        >
            Вычеркнуть
            <img :src="TrashImage" alt="вычеркнуть">
        </c-button>
    </div>
</template>

<style scoped>

</style>