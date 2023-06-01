<script setup>
import { defineAsyncComponent } from 'vue'

const DashBoardHeader = defineAsyncComponent(() => import('../headers/DashboardHeader.vue'))
const DashboardSidebar = defineAsyncComponent(() => import('../navigation/DashboardSidebar.vue'))
</script>

<template>
  <DashBoardHeader />
  <div class="flex gap-32 pt-8 bg-dashboard-gradient">
    <DashboardSidebar />
    <section class="text-white flex-1">
      <slot></slot>
    </section>
  </div>
</template>
