<script setup lang="ts">
import {useStore} from "vuex";
import {computed, watch} from "vue";

const store = useStore();

const isVisible = computed(
    () =>
        store.getters["toast/getVisible"] &&
        store.getters["toast/getText"] !== ''
)

const text = computed(
    () =>
        store.getters["toast/getText"]
)

const type = computed(
    () =>
        store.getters["toast/getType"]
)

const close = () => {
    store.commit('toast/setVisible', false);
}

</script>

<template>
    <Transition>
        <div
            v-show="isVisible"
            @click="close"
            class="toast"
            :class="{
            'toast-warning': type === 'WARNING',
            'toast-error': type === 'ERROR',
            'toast-information': type === 'INFORMATION'
        }"
        >
            {{text}}
        </div>
    </Transition>
</template>

<style scoped lang="scss">
@import "../styles/variables.scss";

.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.toast {
    padding: 15px;

    cursor: pointer;

    border-radius: 5px;

    position: absolute;

    right: 15px;
    bottom: 15px;
}

.toast-warning {
    background-color: $light-toast-warning-color;
}

.toast-error {
    background-color: $light-toast-error-color;
}

.toast-information {
    background-color: $light-toast-information-color;
}

.dark {
    .toast-warning {
        background-color: $dark-toast-warning-color;
    }

    .toast-error {
        background-color: $dark-toast-error-color;
    }

    .toast-information {
        background-color: $dark-toast-information-color;
    }
}

</style>