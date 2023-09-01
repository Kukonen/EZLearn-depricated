<script setup lang="ts">

import TrashImage from "../../../assets/trash.svg";
import {Professor} from "../../../types/common.types.ts";
import CButton from "../../../components/CButton.vue";

const props = defineProps<{
    professor: Professor,
    removeProfessor: (id: string, name: string) => void
}>();

const {professor, removeProfessor} = props;

const remove = () => {
    removeProfessor(professor.id, professor.name);
}

</script>

<template>
    <div>
        <div>
            {{professor.name}}
        </div>
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