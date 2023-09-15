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
    <div class="change__days__lesson__professor">
        <div>
            {{professor.name}}
        </div>
        <c-button
            type="common"
            @click="remove"
        >
            Вычеркнуть
            <svg width="400" height="400" viewBox="0 0 400 400" stroke="black" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="100" y1="345" x2="300" y2="345" stroke-width="10"/>
                <line x1="49.9694" y1="95.0001" x2="349.964" y2="93.1653" stroke-width="10"/>
                <line x1="54.8983" y1="97.9967" x2="105.898" y2="346.997" stroke-width="10"/>
                <line x1="294.102" y1="345.992" x2="345.123" y2="96.9963" stroke-width="10"/>
                <line x1="145" y1="300" x2="145" y2="150" stroke-width="10"/>
                <line x1="195" y1="300" x2="195" y2="150" stroke-width="10"/>
                <line x1="245" y1="300" x2="245" y2="150" stroke-width="10"/>
                <path d="M107.663 93L125.263 53H280.815L293.215 93H107.663Z" stroke-width="10"/>
            </svg>
<!--            <img :src="TrashImage" alt="вычеркнуть">-->
        </c-button>
    </div>

</template>

<style scoped lang="scss">
@import "src/styles/mixins/block";

.change__days__lesson__professor {
    @include block-with-button;
}
</style>