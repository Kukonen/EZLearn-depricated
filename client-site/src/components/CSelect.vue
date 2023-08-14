<script setup lang="ts">

import {ref, toRefs} from "vue";
import {SelectItem} from "../types/elemets.ts";

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

const selectItem = (key: string, text: string) => {
    select(key, text);
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
            @click="open = !open"
        >
            {{ selected }}
        </div>
        <div
            class="select__container"
            v-if="open"
        >
            <div
                v-for="option of selectedItems"
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

    .select__item {
        color: $dark-font-color;

        &:hover {
            color: $dark-font-color-hover;
        }
    }

}

</style>