<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'

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
  description: {
    type: String,
    required: true
  }
})

const moviesStore = useMoviesStore()
const { movieRef } = storeToRefs(moviesStore)

onMounted(async () => {
  await moviesStore.handleGettingMovie(props.id)
})

const editDialogVisibility = ref(false)

const toggleEditDialogVisibility = () => {
  editDialogVisibility.value = !editDialogVisibility.value
}

const router = useRouter()

const onDeleteMovie = async () => {
  await moviesStore.handleDeletingMovie(props.id)
  router.replace({ name: 'moviesList' })
}
const EditMovieDialog = defineAsyncComponent(() =>
  import('@/components/dialog/EditMovieDialog.vue')
)
</script>

<template>
  <div>
    <EditMovieDialog
      v-if="movieRef"
      :show="editDialogVisibility"
      @closeEditDialog="toggleEditDialogVisibility"
      :id="id"
      :movie_en="movieRef.movie.en"
      :movie_ka="movieRef.movie.ka"
      :year="movieRef.year"
      :genres="[...movieRef.genres]"
      :director_en="movieRef.director.en"
      :director_ka="movieRef.director.ka"
      :description_en="movieRef.description.en"
      :description_ka="movieRef.description.ka"
    />
    <div class="mt-6 px-8 md:px-0">
      <header class="flex justify-between items-center">
        <h3 class="font-medium text-2xl text-creme-brulee">
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
          class="font-bold text-lg py-1.5 px-2.5 rounded-[4px] bg-gray-slate"
          >{{ genre.genre }}</span
        >
      </div>
      <div class="mt-5">
        <span class="text-input-disabled-border font-bold text-lg"
          >{{ $t('movie.director') }}:
        </span>
        <span class="font-bold ml-2.5">{{ director }}</span>
      </div>
      <div class="mt-5">
        <p class="text-lg text-input-disabled-border">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
