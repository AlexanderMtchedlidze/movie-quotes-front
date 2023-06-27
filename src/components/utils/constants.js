import { ref, computed, watch } from 'vue'

export const formClass = computed(() => 'flex flex-col gap-6 mt-6')

export const dashboardFormClass = computed(() => 'flex flex-col gap-6 text-start')

export const fieldClass = computed(
  () =>
    'ps-3 py-2 rounded text-input-text bg-gray-smoke w-full focus:outline-none focus:ring focus:border-none focus:ring-cloud-focus disabled:ps-0 md:disabled:ps-3 disabled:rounded-none md:disabled:rounded disabled:border-b md:disabled:border disabled:border-input-disabled-border disabled:bg-transparent disabled:text-white md:disabled:text-input-text md:disabled:bg-input-disabled-placeholder'
)

const locale = ref(localStorage.getItem('locale'))

watch(locale, () => {
  console.log('a')
})

watch('$i18n.locale', (newVal) => {
  console.log(newVal)
  locale.value = newVal
})

