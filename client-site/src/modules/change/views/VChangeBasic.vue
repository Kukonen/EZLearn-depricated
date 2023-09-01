<script setup lang="ts">

import CHeading from "../../../components/CHeading.vue";
import CSelect from "../../../components/CSelect.vue";
import {computed, onMounted, ref, watch} from "vue";
import {SelectItem} from "../../../types/elemets.ts";
import {getUniversity, getGroup, getTemplate, selectSchedule} from "../../../helpers/scheduleSettings/basic.helper.ts";
import {useStore} from 'vuex';
import CButton from "../../../components/CButton.vue";

const store = useStore();

const BASE_UNIVERSITY_PLACEHOLDER = 'Выберете университет';
const BASE_GROUP_PLACEHOLDER = 'Выберете группу';
const BASE_TEMPLATE_PLACEHOLDER = 'Выберете редакцию';

const university = ref<SelectItem>({key: '', text: BASE_UNIVERSITY_PLACEHOLDER});
const universities = ref<SelectItem[]>();

const group = ref<SelectItem>({key: '', text: BASE_GROUP_PLACEHOLDER});
const groups = ref<SelectItem[]>();

const template = ref<SelectItem>({key: '', text: BASE_TEMPLATE_PLACEHOLDER});
const templates = ref<SelectItem[]>();

onMounted(() => {
    getUniversity().then(university => universities.value = university);
})

const selectUniversity = (key: string, text: string) => {
    university.value = {key, text};

    group.value.text = BASE_GROUP_PLACEHOLDER;

    getGroup(key).then(group => groups.value = group);

    template.value.text = BASE_TEMPLATE_PLACEHOLDER;
    templates.value = [];
}

const selectGroup = (key: string, text: string) => {
    group.value = {key, text};

    template.value.text = BASE_TEMPLATE_PLACEHOLDER;
    getTemplate(key).then(template => templates.value = template);
}

const selectTemplate = (key: string, text: string) => {
    template.value = {key, text};
}
const isShowButton = computed( () => {
    return university.value.text !== BASE_UNIVERSITY_PLACEHOLDER &&
        group.value.text !== BASE_GROUP_PLACEHOLDER &&
        template.value.text !== BASE_TEMPLATE_PLACEHOLDER
});

const selectBasicSchedule = () => {
    selectSchedule(
        university.value.key,
        group.value.key,
        template.value.key
    ).then(scheduleInformation => {
        store.dispatch('schedule/selectSchedule', scheduleInformation);
    });
}

</script>

<template>
    <c-heading type="LARGE">
        Основные Настройки
    </c-heading>
    <c-heading type="MEDIUM">
        Выбор Готовых Расписаний
    </c-heading>
    <div class="settings__basic__selects__container">
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
        <c-select
            id="template_select"
            :placeholder="template.text"
            :selectedItems="templates"
            :select="selectTemplate"
        />
    </div>
    <c-button
        type="common"
        v-if="isShowButton"
        @click="selectBasicSchedule"
    >
        Выбрать Расписание
    </c-button>
</template>

<style scoped lang="scss">
@import "src/styles/mixins/position.in.block";

.settings__basic__selects__container {
    @include centralize-selects;
}
</style>