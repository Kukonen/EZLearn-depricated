<script setup lang="ts">
const {type} = defineProps<{
    h: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    type: 'LARGE' | 'MEDIUM' | 'SMALL'
}>();
</script>

<template>
    <component
        :is="h ? h : 'h6'"
        class="heading"
        :class="{
            large: type === 'LARGE',
            medium: type === 'MEDIUM',
            small: type === 'SMALL'
        }"
    >
        <slot />
    </component>
</template>

<style scoped>
.heading {
    font-size: 30px;

    padding: 15px;

    font-weight: 500;

    text-align: center;
}

.large {
    font-size: 30px;

    font-weight: 650;
}

.medium {
    font-size: 28px;
}

.small {
    font-size: 24px;

    text-align: left;

    padding-left: 15%;
}
</style>