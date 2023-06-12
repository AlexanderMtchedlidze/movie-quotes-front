<script setup>
const emit = defineEmits(['update:modelValue'])

defineProps({
  name: {
    type: String,
    required: true
  }
})

const updateModel = (e) => {
  const file = e.target.files[0]
  emit('update:modelValue', file)
}
</script>

<template>
  <div
    class="flex items-center justify-between md:justify-start gap-2 bg-transparent border border-gray-slate py-5 px-4 rounded-md w-full text-base md:text-xl"
  >
    <div class="flex gap-2 items-center">
      <img src="@/assets/icons/input/camera.svg" alt="Camera icon" />

      <span class="hidden md:block">{{ $t('news_feed.form.drag_n_drop_your_image') }}</span>
      <span class="block md:hidden">{{ $t('news_feed.form.choose_your_file') }}</span>
    </div>
    <label :for="name" class="hover:cursor-pointer bg-dark-purple/40 p-2.5">{{
      $t('news_feed.form.choose_your_file')
    }}</label>
    <input @change="updateModel" :name="name" :id="name" type="file" class="hidden flex-1" />
  </div>
</template>
