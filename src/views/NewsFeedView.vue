<script setup>
import { defineAsyncComponent } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import { storeToRefs } from 'pinia'

const quotesStore = useQuotesStore()

const { quotes } = storeToRefs(quotesStore)

const DashBoardWrapper = defineAsyncComponent(() =>
  import('../components/wrapper/DashboardWrapper.vue')
)

const QuoteQard = defineAsyncComponent(() => import('../components/quotes/QuoteCard.vue'))
</script>

<template>
  <DashBoardWrapper>
    <div class="w-9/12">
      <header class="flex gap-2">
        <ActionButton type="tertiary" class="flex gap-4 px-4 py-3 text-start rounded-xl">
          <img src="@/assets/icons/pencil.svg" alt="Pencil icon" />
          <span> Write new quote </span>
        </ActionButton>
        <div class="flex-1 relative text-input-disabled-border">
          <input
            type="text"
            name="q"
            placeholder="Enter @ to search movies, Enter # to search quotes "
            class="w-full border-b bg-transparent placeholder:text-input-disabled-border h-full ps-10"
          />
          <img
            src="../assets/icons/input/search-icon.svg"
            alt="Search icon"
            class="absolute top-1/2 -translate-y-1/2 left-3"
          />
        </div>
      </header>
      <div class="flex gap-10 pt-5 pb-10">
        <QuoteQard
          v-for="quote in quotes"
          :key="quote.id"
          :id="quote.id"
          :author="quote.author"
          :author-profile-image-src="quote.authorProfileImageSrc"
          :quote="quote.quote"
          :quote-image-src="quote.quoteImageSrc"
          :movie="quote.movie"
          :comment-amount="quote.commentAmount"
          :comments="quote.comments"
          :like-amount="quote.likeAmount"
        />
      </div>
    </div>
  </DashBoardWrapper>
</template>
