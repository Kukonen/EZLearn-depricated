<script setup lang="ts">

import CRouter from "../components/CRouter.vue";
import CLink from "../components/CLink.vue";
import {computed, onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
import {useRoute} from "vue-router";
import CChangeSidebar from "../modules/change/components/CChangeSidebar.vue";

const route = useRoute();
const currentRouteName = computed(() => route)

/** хак, чтобы после расширения окна меню закрывалось **/

const mediaQuery = window.matchMedia("(max-width: 42rem)");

const mediaListener = event => {
    const menu = document.getElementById("main__links");

    if (!mediaQuery.matches) {
        menu?.classList.remove('main__links__visible');
        menu.style.display = "none";
    }
}

onBeforeMount(() => {
    window.addEventListener("resize", mediaListener);
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", mediaListener);
})

/** хак закончен, простите **/

</script>

<template>
    <main>
        <nav id="main__links">
            <template
                v-if="currentRouteName.path.includes('/change')"
            >
                <c-link
                    class="content__navbar__link"
                    path="/change/"
                >
                    Базовые настройки
                </c-link>
                <c-link
                    class="content__navbar__link"
                    path="/change/template"
                >
                    Основные настройки шаблона
                </c-link>
                <c-link
                    class="content__navbar__link"
                    path="/change/professors"
                >
                    Преподаватели
                </c-link>
                <c-link
                    class="content__navbar__link"
                    path="/change/lessons"
                >
                    Занятия
                </c-link>
                <c-link
                    class="content__navbar__link"
                    path="/change/times"
                >
                    Время занятий
                </c-link>
                <c-link
                    class="content__navbar__link"
                    path="/change/days"
                >
                    Дни недели
                </c-link>

                <hr
                    class="content__navbar__hr"
                />
            </template>


            <c-link
                class="content__navbar__link"
                path='/profile'
            >
                Профиль
            </c-link>
            <c-link
                class="content__navbar__link"
                path='/schedule'
            >
                Рассписание
            </c-link>
            <c-link
                class="content__navbar__link"
                path='/change'
            >
                Редактировать рассписание
            </c-link>
        </nav>
        <div id="main__content">
            <c-router />
        </div>
    </main>
</template>

<style scoped lang="scss">

@import "src/styles/variables";

.main__links__change {
    display: flex;

    flex-direction: column;
}

.content__navbar__hr {
    width: 100%;

    border: 1px solid $light-border-color;
}

.dark {
    .content__navbar__hr {
        border: 1px solid $dark-border-color;
    }

}

</style>