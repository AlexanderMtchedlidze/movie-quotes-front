<script setup>
defineProps({
  quote: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="font-bold text-white h-screen bg-cover bg-center bg-fixed">
    <div class="relative ml-12 md:ml-24 lg:ml-36 top-64 flex gap-4">
      <div class="border-t-2 w-10 mt-6"></div>
      <div>
        <blockquote class="text-3xl md:text-5xl" v-html="quote"></blockquote>
        <p class="text-xl md:text-3xl mt-4">{{ movie }}</p>
      </div>
    </div>
  </div>
</template>
