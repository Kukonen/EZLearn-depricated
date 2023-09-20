<script setup lang="ts">
import '../../../styles/auth.scss';
import CHeading from "../../../components/CHeading.vue";
import CButton from "../../../components/CButton.vue";
import {ref} from "vue";
import {request} from "../../../utils/request.ts";
import {useStore} from "vuex";
import CLink from "../../../components/CLink.vue";

const store = useStore();

const username = ref<string>();
const password = ref<string>();

const login = async () => {
    request('/v1/auth/login', 'POST', {
        username: username.value,
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
            Войти
        </c-heading>
        <form class="auth__section__form" @submit.prevent="login">
            <input
                @input="event => username = event.target.value"
                type="text"
                placeholder="Логин или Почта"
                class="auth__section__input"
            >
            <input
                @input="event => password = event.target.value"
                type="password"
                placeholder="Пароль"
                class="auth__section__input"
            >

            <c-link path="/auth/register">
                Нет Аккаунта? Загрегистрируйся!
            </c-link>

            <c-button
                type="common"
                class="auth__section__button"
            >
                Войти
            </c-button>
        </form>
    </div>
</template>

<style scoped>

</style>