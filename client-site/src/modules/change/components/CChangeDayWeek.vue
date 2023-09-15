<script setup lang="ts">

import CButton from "../../../components/CButton.vue";
import {toRefs} from "vue";
import {WeekType} from "../../../types/elemets.ts";

const props = defineProps<{
    week: WeekType,
    changeWeek: (newWeek: WeekType) => void,
    toggleWeek: () => void,
    deleteLesson: () => void
}>();

const {week} = toRefs(props);

</script>

<template>
    <div class="change__days__lesson__options">
        <div
            class="change__days__lesson__week__section"
        >
            <c-button
                :type="week === 'odd' ? 'secondary' : 'common'"
                @click="changeWeek('odd')"
                class="change__days__lesson__week__odd"
            >
                Нечётная
            </c-button>
            <c-button
                :type="week === 'even' ? 'secondary' : 'common'"
                @click="changeWeek('even')"
                class="change__days__lesson__week__even"
            >
                Чётная
            </c-button>
        </div>

        <c-button
            type="common"
            @click="toggleWeek()"
        >
            {{week === "odd" ? '&nbsp;' : ''}}
            Сделать занятие также и в {{ week === "odd" ? 'чётной' : 'нечётной' }}
            {{week === "odd" ? '&nbsp;' : ''}}
        </c-button>

        <c-button
            type="common"
            @click="deleteLesson"
        >
            Удалить занятие
        </c-button>
    </div>
</template>

<style scoped lang="scss">

@import "src/styles/variables";

.change__days__lesson__options {
    display: flex;

    justify-content: center;

    gap: 1rem;

    button {
        margin: 0;
    }
}

.change__days__lesson__week__section {
    display: flex;
}

.change__days__lesson__week__odd {
    border-radius: 5px 0 0 5px;
    border-right: 0 !important;
}

.change__days__lesson__week__even {
    border-radius: 0 5px 5px 0;
    border-left: 0 !important;
}

</style>