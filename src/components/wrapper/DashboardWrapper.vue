<script setup>
import { defineAsyncComponent } from 'vue'

const DashboardSidebar = defineAsyncComponent(() => import('../navigation/DashboardSidebar.vue'))
</script>

<template>
  <DashboardSidebar />
</template>
