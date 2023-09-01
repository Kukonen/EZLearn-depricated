<script setup lang="ts">

import CHeading from "../../../../components/CHeading.vue";
import {onMounted, ref} from "vue";
import {SelectItem} from "../../../../types/elemets.ts";
import {getGroup, getUniversity} from "../../../../helpers/scheduleSettings/basic.helper.ts";
import CSelect from "../../../../components/CSelect.vue";
import {useStore} from "vuex";
import {ScheduleInformation} from "../../../../types/schedule.types.ts";
import CButton from "../../../../components/CButton.vue";

const store = useStore();

const BASE_UNIVERSITY_PLACEHOLDER = 'Выберете университет';
const BASE_GROUP_PLACEHOLDER = 'Выберете группу';

const university = ref<SelectItem>({key: '', text: BASE_UNIVERSITY_PLACEHOLDER});
const universities = ref<SelectItem[]>();

const group = ref<SelectItem>({key: '', text: BASE_GROUP_PLACEHOLDER});
const groups = ref<SelectItem[]>();

const template = ref<string>('')

onMounted(() => {
    const scheduleInformation: ScheduleInformation = store.getters["scheduleSettings/getScheduleInformation"];

    if (scheduleInformation.university) {
        
    }

    getUniversity().then(university => universities.value = university);
})

const selectUniversity = (key: string, text: string) => {
    university.value = {key, text};

    group.value.text = BASE_GROUP_PLACEHOLDER;

    getGroup(key).then(group => groups.value = group);
}

const selectGroup = (key: string, text: string) => {
    group.value = {key, text};
}

</script>

<template>

    <c-heading type="MEDIUM">
        Основные настройки
    </c-heading>
    <div class="change__template__settings__container">
        <c-select
            id="university_select"
            :placeholder="university.text"
            :selectedItems="universities"
            :select="selectUniversity"
        />
        <c-select
            id="group_select"
            :placeholder="group.text"
            :selectedItems="groups"
            :select="selectGroup"
        />

        <div class="change__template__settings__input__block">
            <input
                @input="event => template = event.target.value"
            />

            <c-button type="common">
                Сохранить
            </c-button>
        </div>

    </div>

</template>

<style scoped lang="scss">
@import "src/styles/mixins/position.in.block";
@import "src/styles/mixins/input";

.change__template__settings__container {
    @include centralize-selects;
}

.change__template__settings__input__block {
    @include input-with-button-block;
}
</style>