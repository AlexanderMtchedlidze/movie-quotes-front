<script setup>
defineProps({
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
</script>

<template>
  <div>
    <div class="mt-6">
      <header class="flex justify-between items-center">
        <h3 class="font-medium text-2xl text-creme-brulee">
          {{ movie }}
          <span> ({{ year }}) </span>
        </h3>
        <div class="bg-midnight-creme-brulee rounded-lg py-2 px-4 flex gap-6">
          <div class="w-5 h-5">
            <img
              src="@/assets/icons/borderless-pencil.svg"
              alt="Pencil icon"
              class="hover:cursor-pointer inline-block"
            />
          </div>
          <img src="@/assets/icons/line.svg" alt="Line icon" />
          <div class="h-5 w-5">
            <img
              src="@/assets/icons/trash-can.svg"
              alt="Trach can icon"
              class="hover:cursor-pointer inline-block"
            />
          </div>
        </div>
      </header>
      <div class="mt-6 flex gap-2">
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
