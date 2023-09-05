<script setup lang="ts">

import CRouter from "../components/CRouter.vue";
import CLink from "../components/CLink.vue";
import {onBeforeMount, ref} from "vue";

/** хак, чтобы после расширения окна меню закрывалось **/

const menuVisibleStatus = ref<boolean>(false);

const mediaQuery = window.matchMedia("(max-width: 42rem)");

menuVisibleStatus.value = mediaQuery.matches;

const mediaListener = event => {

    if (menuVisibleStatus.value && !mediaQuery.matches) {
        document.getElementById("main__links").style.display = 'none';
    }
}

onBeforeMount(() => {
    window.addEventListener("resize", mediaListener);
})

onBeforeMount(() => {
    window.addEventListener("resize", mediaListener);
})

/** хак закончен, простите **/

</script>

<template>
    <main>
        <nav id="main__links">
            <c-link path='/profile'>Профиль</c-link>
            <c-link path='/schedule'>Рассписание</c-link>
            <c-link path='/change'>Редактировать рассписание</c-link>
        </nav>
        <div id="main__content">
            <c-router />
        </div>
    </main>
</template>

<style scoped>

</style>