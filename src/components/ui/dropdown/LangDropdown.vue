<script setup>
import { defineAsyncComponent } from 'vue'
const Dropdown = defineAsyncComponent(() => import('./Dropdown.vue'))
const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))
</script>

<template>
  <Dropdown>
    <template #dropdown-trigger>
      <button class="flex items-center gap-3" @click="toggleVisibility">
        <span class="text-white">Eng</span>
        <img src="@/assets/icons/dropdown-vector.svg" alt="Dropdown arrow vector" />
      </button>
    </template>
    <template #default>
      <DropdownItem>Ka</DropdownItem>
    </template>
  </Dropdown>
</template>
