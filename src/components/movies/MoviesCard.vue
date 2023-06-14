<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  movieImageSrc: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  quotesCount: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const switchToMoviePage = () => {
  router.push({ name: 'movie', params: { id: props.id } })
}
</script>

<template>
  <figure class="font-normal">
    <img :src="movieImageSrc" alt="Movie image" class="rounded-xl" />
    <div class="flex flex-col gap-5 mt-4">
      <div>
        <span class="text-2xl hover:cursor-pointer" @click="switchToMoviePage">
          {{ movie }}
        </span>
      </div>
      <div class="flex gap-3">
        <img src="@/assets/icons/notification/comment.svg" alt="Quote icon" />
        {{ quotesCount }}
      </div>
    </div>
  </figure>
</template>
