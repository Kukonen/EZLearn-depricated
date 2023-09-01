<script setup lang="ts">
import SunImage from '../assets/sun.svg';
import MoonImage from '../assets/moon.svg';

import {computed, ref} from "vue";

const themeIsDark = ref<boolean>(
        document.documentElement.classList.contains('dark')
);

const switchTheme = () => {
    document.documentElement.classList.toggle('dark')
    themeIsDark.value = document.documentElement.classList.contains('dark')
}

</script>

<template>
    <button
        @click="switchTheme"
        :class="{
            'button_theme_light': !themeIsDark,
            'button_theme_dark': themeIsDark
        }"
    >
        Поменять тему
        <transition name="image" mode="out-in">
            <img
                key="theme-image"
                alt="смена темы"
                :src="themeIsDark ? MoonImage : SunImage"
            />
        </transition>
    </button>
</template>

<style scoped lang="scss">
@import "src/styles/variables";

button {
    cursor: pointer;

    border: 0;

    border-radius: 5px;

    padding: 10px 15px;
}

button :deep(img) {
    vertical-align:middle;

    width: $font-size;
    height: $font-size;
}

.button_theme_light {
    color: $dark-font-color;

    background-color: $dark-background-color;
}

.button_theme_dark {
    color: $light-font-color;

    background-color: $light-background-color;
}

.image-enter-active,
.image-leave-active {
    transition: opacity .3s;
}

.image-enter,
.image-leave-to {
    opacity: 0;
}

</style>