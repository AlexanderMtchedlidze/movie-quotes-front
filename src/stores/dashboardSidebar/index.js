import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardSidebarStore = defineStore('dashboardSidebarStore', () => {
  const isDashboardSidebarVisible = ref(false)

  const toggleDashboardSidebarVisibility = () => {
    isDashboardSidebarVisible.value = !isDashboardSidebarVisible.value
  }

  const hideDashboardSidebar = () => {
    isDashboardSidebarVisible.value = false
  }

  return {
    isDashboardSidebarVisible,
    toggleDashboardSidebarVisibility,
    hideDashboardSidebar
  }
})
