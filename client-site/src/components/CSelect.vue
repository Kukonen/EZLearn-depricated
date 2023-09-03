<script setup lang="ts">

import {computed, ref, toRefs} from "vue";
import {SelectItem} from "../types/elemets.ts";
import CTransition from "./common/c-transition.vue";

const props = defineProps<{
    id: string,
    placeholder: string,
    selectedItems: SelectItem[],
    select: (key: string, text: string) => void
}>();

const {select} = props;
const {id, placeholder, selectedItems} = toRefs(props);

const open = ref(false);
const selected = ref(placeholder ? placeholder : 'Выберете один из вариантов');

const selectInput = ref<string>();
const filteredSelectedItems = computed(() => {
    if (!selectInput.value) {
        return selectedItems.value;
    }

    return selectedItems.value.filter(
        item =>
            item.text.toUpperCase().indexOf(selectInput.value?.toUpperCase()) !== -1
    )
})

const selectItem = (key: string, text: string) => {
    select(key, text);
}

const clickOnHeading = () => {
    if (open.value === true) {
        open.value = false;
        return;
    }

    if (selectedItems.value.length > 0) {
        open.value = true;
        return;
    }
}

const hide = () => open.value = false;

</script>

<template>
    <div class="select" :key="id">
        <div
            class="select__current"
            :class="{
                select__current_active: open
            }"
            @click="clickOnHeading"
        >
            {{ selected }}
        </div>
        <c-transition>
            <div
                v-if="open"
                class="select__container"
            >
                <input
                    type="text"
                    :value="selectInput"
                    @input="event => selectInput = event.target.value"
                    class="select__input"
                />
                <div
                    v-for="option of filteredSelectedItems"
                    class="select__item"
                    :key="option.key"
                    @click="
                  selected = option.text;
                  hide();
                  selectItem(option.key, option.text);
                "
                >
                    {{ option.text }}
                </div>
            </div>
        </c-transition>
    </div>
</template>

<style scoped lang="scss">
@import "src/styles/variables";

.select {
    position: relative;
    outline: none;

    .select__current {
        border: 1px solid $light-border-color;

        padding: 10px;

        cursor: pointer;

        user-select: none;
    }

    .select__current_active {
        border-radius: 5px 5px 0 0;
    }

    .select__container {
        overflow: hidden;

        border: 1px solid $light-border-color;
        border-radius: 0 0 5px 5px;

        position: absolute;

        left: 0;
        right: 0;

        background-color: $light-background-color;

        z-index: 1;
    }

    .select__input {
        width: 100%;
        outline: none;
        border: 0;
        border-bottom: 1px solid $light-border-color;
    }

    .select__item {
        color: $light-font-color;

        padding: 10px;

        cursor: pointer;

        user-select: none;

        &:hover {
            color: $light-font-color-hover;
        }
    }
}

.dark {

    .select__current {
        border: 1px solid $dark-border-color;
    }

    .select__container {
        border: 1px solid $dark-border-color;

        background-color: $dark-background-color;
    }

    .select__input {
        border-bottom: 1px solid $dark-border-color;
    }

    .select__item {
        color: $dark-font-color;

        &:hover {
            color: $dark-font-color-hover;
        }
    }

}

</style>