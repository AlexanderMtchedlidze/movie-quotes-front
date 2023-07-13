<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import { onMounted, computed } from 'vue'
import { useLocalization } from '@/stores/localization'

const localizationStore = useLocalization()

const { mediumFontClass, boldFontClass } = storeToRefs(localizationStore)

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const moviesStore = useMoviesStore()

onMounted(async () => {
  await moviesStore.handleGettingMovie(props.id)
})

const router = useRouter()

const toggleEditDialogVisibility = () => {
  router.push({ name: 'editMovieDialog' })
}

const onDeleteMovie = async () => {
  await moviesStore.handleDeletingMovie(props.id)
  router.replace({ name: 'moviesList' })
}

const formattedBudget = computed(() => {
  const numberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }

  if (props.budget > 999) {
    return props.budget?.toLocaleString(undefined, numberFormatOptions)
  } else {
    return props.budget?.toString()
  }
})
</script>

<template>
  <div>
    <div class="mt-6 px-8 md:px-0">
      <header class="flex justify-between gap-4 items-center">
        <h3 :class="mediumFontClass" class="text-2xl text-creme-brulee">
          {{ movie }}
          <span> ({{ year }}) </span>
        </h3>
        <div class="bg-midnight-creme-brulee rounded-lg py-2 px-4 flex gap-6">
          <div class="w-5 h-5">
            <img
              src="@/assets/icons/borderless-pencil.svg"
              :alt="$t('alts.pencil_icon')"
              class="hover:cursor-pointer inline-block"
              @click="toggleEditDialogVisibility"
            />
          </div>
          <img src="@/assets/icons/line.svg" alt="Line icon" />
          <div class="h-5 w-5">
            <img
              src="@/assets/icons/trash-can.svg"
              :alt="$t('alts.trashcan_icon')"
              class="hover:cursor-pointer inline-block"
              @click="onDeleteMovie"
            />
          </div>
        </div>
      </header>
      <div class="mt-6 flex flex-wrap gap-2">
        <span
          v-for="genre in genres"
          :key="genre"
          :class="boldFontClass"
          class="text-lg py-1.5 px-2.5 rounded-[4px] bg-gray-slate"
          >{{ genre }}</span
        >
      </div>
      <div class="mt-5" :class="boldFontClass">
        <span class="text-input-disabled-border text-lg">{{ $t('movie.director') }}: </span>
        <span class="ml-2.5">{{ director }}</span>
      </div>
      <div class="mt-5" :class="boldFontClass">
        <span class="text-input-disabled-border text-lg">{{ $t('movie.budget') }}: </span>
        <span class="ml-2.5">{{ formattedBudget }}</span>
        <span class="ml-1">$</span>
      </div>
      <div class="mt-5">
        <p class="text-lg text-input-disabled-border">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
