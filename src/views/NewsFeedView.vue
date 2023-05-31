<script setup>
import { defineAsyncComponent } from 'vue';

const DashBoardWrapper = defineAsyncComponent(() => import("../components/wrapper/DashboardWrapper.vue"))
</script>

<template>
<DashBoardWrapper>
    <p>Hello, World!</p>
</DashBoardWrapper>
</template>