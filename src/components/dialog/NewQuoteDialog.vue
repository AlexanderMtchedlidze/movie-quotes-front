<script setup>
import { defineAsyncComponent } from 'vue'
import { useQuotesStore } from '@/stores/quotes'

const DashboardDialog = defineAsyncComponent(() => import('../ui/BaseDashboardDialog.vue'))

const quotesStore = useQuotesStore()
</script>

<template>
  <DashboardDialog
    title="Write New Quote"
    :show="quotesStore.isNewQuoteDialogVisible"
    @close="quotesStore.toggleNewQuoteDialogVisibility"
  ></DashboardDialog>
</template>
