<script setup>
import { defineAsyncComponent } from 'vue'

const TheDashboardHeader = defineAsyncComponent(() => import('../headers/TheDashboardHeader.vue'))
const DashboardSidebar = defineAsyncComponent(() => import('../navigation/DashboardSidebar.vue'))
</script>

<template>
  <div class="h-screen overflow-hidden">
    <TheDashboardHeader />
    <div class="flex lg:gap-16 xl:gap-32 pt-8 bg-dashboard-gradient h-full">
      <div class="text-white hidden md:block">
        <div class="flex flex-col gap-10 ps-16 w-80">
          <DashboardSidebar />
        </div>
      </div>
      <section class="text-white w-full overflow-y-auto">
        <slot></slot>
      </section>
    </div>
    <section class="text-white flex-1">
      <slot></slot>
    </section>
  </div>
</template>
