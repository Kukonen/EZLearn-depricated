<script setup lang="ts">

import CHeading from "../../../components/CHeading.vue";
import CButton from "../../../components/CButton.vue";
import {useStore} from "vuex";
import {ref} from "vue";
import CLink from "../../../components/CLink.vue";
import {request} from "../../../utils/request.ts";

const store = useStore();

const name = ref<string>();
const username = ref<string>();
const email = ref<string>();
const password = ref<string>();
const passwordRepeat = ref<string>();

const register = async () => {
    request('/v1/auth/register', 'POST', {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value
    }).then(res => {

    }).catch(e => {
        store.dispatch('toast/doToast', {
            text: 'Не Удалось Войти в Аккаунт, Попробуйсте Снова',
            type: 'ERROR'
        })
    })
}
</script>

<template>
    <div class="auth__section">
        <c-heading h="h1" type="MEDIUM">
            Зарегистироваться
        </c-heading>
        <form class="auth__section__form" @submit.prevent="register">
            <input
                @input="event => name = event.target.value"
                type="text"
                placeholder="Имя"
                class="auth__section__input"
            >
            <input
                @input="event => username = event.target.value"
                type="text"
                placeholder="Логин"
                class="auth__section__input"
            >
            <input
                @input="event => email = event.target.value"
                type="email"
                placeholder="Почта"
                class="auth__section__input"
            >
            <input
                @input="event => password = event.target.value"
                type="password"
                placeholder="Пароль"
                class="auth__section__input"
            >
            <input
                @input="event => passwordRepeat = event.target.value"
                type="password"
                placeholder="Пароль Ещё Раз"
                class="auth__section__input"
            >

            <c-link path="/auth/login">
                Есть Аккаунт? Войти
            </c-link>

            <c-button
                type="common"
                class="auth__section__button"
            >
                Зарегистрироваться
            </c-button>
        </form>
    </div>
</template>

<style scoped>

</style>