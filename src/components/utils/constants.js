import { computed } from 'vue'

export const formClass = computed(() => 'flex flex-col gap-6 mt-6')

export const dashboardFormClass = computed(() => 'flex flex-col gap-6 text-start')

export const fieldClass = computed(
  () =>
    'ps-3 py-2 rounded text-input-text bg-gray-smoke w-full focus:outline-none focus:ring focus:border-none focus:ring-cloud-focus disabled:border disabled:border-input-disabled-border disabled:bg-input-disabled-placeholder disabled:text-input-text'
)
