<script setup lang="ts">
import CLink from "../components/CLink.vue";
import CThemeButton from "./CThemeButton.vue";

import LogoImage from "../assets/logo.svg";
import LogoMenu from "../assets/menu.svg";
import {useStore} from "vuex";

const store = useStore();

// некрасивый хак для изменения видимости меню
const changeMenuVisible = () => {
    if (
        // некрасиво, извените :(
        document.documentElement.offsetWidth /
        getComputedStyle(document.documentElement).fontSize
        > 42
    ) {
        return;
    }

    const menu = document.getElementById("main__links");

    if(menu.classList.contains('main__links__visible')) {
        menu.classList.remove('main__links__visible');
        menu.classList.add('main__links__closing');
        setTimeout(function() {
            menu.classList.remove("main__links__closing");
            menu.style.display = "none";
        }, 300);

    } else {
        menu.classList.add('main__links__visible');
        menu.style.display = "flex";
    }
}

// хак закончен
</script>

<template>
    <header>
        <div class="header__logo">
            <c-link path="/schedule">
                <img
                    class="header__logo__image"
                    :src="LogoImage"
                    alt="logo"
                />
            </c-link>
        </div>
        <div
            @click="changeMenuVisible"
            class="header__menu"
        >
            <img
                class="header__menu__image"
                :src="LogoMenu"
                alt="menu"
            />
        </div>
        <nav class="header__links">
            <c-link path='/profile'>Профиль</c-link>
            <c-link path='/schedule'>Рассписание</c-link>
            <c-link path='/change'>Редактировать рассписание</c-link>
        </nav>
        <div class="header__theme">
            <c-theme-button />
        </div>
    </header>

</template>

<style scoped lang="scss">

</style>