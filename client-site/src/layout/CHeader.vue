<script setup lang="ts">
import CLink from "../components/CLink.vue";
import LogoImage from "../assets/logo.svg";
import CThemeButton from "./CThemeButton.vue";

</script>

<template>
    <header>
        <div class="header__logo">
            <c-link path="/schedule">
                <img class="header__logo__image" :src="LogoImage" alt="logo" />
            </c-link>
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