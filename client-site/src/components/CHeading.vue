<script setup lang="ts">
const {type} = defineProps<{
    type: 'LARGE' | 'MEDIUM' | 'SMALL'
}>();
</script>

<template>
    <div
        class="heading"
        :class="{
            large: type === 'LARGE',
            medium: type === 'MEDIUM',
            small: type === 'SMALL'
        }"
    >
        <slot />
    </div>
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