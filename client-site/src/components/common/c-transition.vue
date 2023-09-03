<script setup lang="ts">

</script>

<template>
    <transition
        name="fade"
        mode="out-in"
    >
        <slot />
    </transition>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>