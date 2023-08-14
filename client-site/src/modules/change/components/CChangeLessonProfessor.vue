<script setup lang="ts">

import TrashImage from "../../../assets/trash.svg";
import {Professor} from "../../../types/common.types.ts";

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
        <button
            @click="remove"
        >
            Вычеркнуть
            <img :src="TrashImage" alt="вычеркнуть">
        </button>
    </div>

</template>

<style scoped>

</style>