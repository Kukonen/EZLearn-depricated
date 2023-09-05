<script setup lang="ts">
import {ButtonType} from "../types/elemets.ts";

const props = defineProps<{
    type: ButtonType;
}>();

const {type} = props;
</script>

<template>
    <button :class="{
        'button_primary': type === 'primary',
        'button_secondary': type === 'secondary',
        'button_common': type === 'common'
    }">
        <slot />
    </button>
</template>

<style scoped lang="scss">
@import "src/styles/variables";

button {
    display: block;

    font-size: 1em;

    padding: 0.65em;

    border-radius: 5px;

    cursor: pointer;

    margin: 0 auto;

    &:hover {
        transition: all 200ms ease-in-out;
    }


}

button :deep(img) {
    vertical-align:middle;

    width: 1rem;
    height: 1rem;
}

.button_primary {
    background-color: $light-button-primary-background-color;

    border: 1px solid $light-button-primary-border-color;

    &:hover {
        background-color: $light-button-primary-background-color-hover;
    }
}

.button_secondary {
    background-color: $light-button-secondary-background-color;

    border: 1px solid $light-button-secondary-border-color;

    &:hover {
        background-color: $light-button-secondary-background-color-hover;
    }
}

.button_common {
    background-color: $light-button-common-background-color;

    border: 1px solid $light-button-common-border-color;

    &:hover {
        background-color: $light-button-common-background-color-hover;
    }
}

button {
    color: $light-font-color;
}

.dark {
    button {
        color: $dark-font-color;
    }

    .button_primary {
        background-color: $dark-button-primary-background-color;

        border: 1px solid $dark-button-primary-border-color;

        &:hover {
            background-color: $dark-button-primary-background-color-hover;
        }
    }

    .button_secondary {
        background-color: $dark-button-secondary-background-color;

        border: 1px solid $dark-button-secondary-border-color;

        &:hover {
            background-color: $dark-button-secondary-background-color-hover;
        }
    }

    .button_common {
        background-color: $dark-button-common-background-color;

        border: 1px solid $dark-button-common-border-color;

        &:hover {
            background-color: $dark-button-common-background-color-hover;
        }
    }
}
</style>