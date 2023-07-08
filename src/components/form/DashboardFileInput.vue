<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  flexStructure: {
    type: String,
    required: false,
    default: 'row'
  }
})

const updateModel = (e, handleChange) => {
  const file = e.target.files[0]
  handleChange(file)
  emit('update:modelValue', file)
}

const wrapperClass = computed(() => ({
  'flex-col gap-2 md:gap-4': props.flexStructure === 'col',
  'flex-row border border-gray-slate': props.flexStructure === 'row'
}))

const rules = { required: props.flexStructure !== 'col' }

const drop = (e, handleChange) => {
  console.log('a')
  const file = e.dataTransfer.files[0]
  handleChange(file)
  emit('update:modelValue', file)
}
</script>

<template>
  <div @drop="">
    <Field :name="name" v-slot="{ handleChange, handleBlur }" :rules="rules" as="div">
      <div
        :class="wrapperClass"
        class="flex items-center justify-between md:justify-start gap-2 bg-transparent py-5 px-4 rounded-md w-full text-base md:text-xl mb-1"
        @drop.prevent="console.log('a')"
      >
        <input
          :id="name"
          type="file"
          class="hidden"
          @blur="handleBlur"
          @change="updateModel($event, handleChange)"
        />
        <slot>
          <div>
            <div class="flex gap-2 items-center">
              <img src="@/assets/icons/input/camera.svg" :alt="$t('alts.camera_icon')" />

              <span class="hidden md:block">{{ $t('news_feed.form.drag_n_drop_your_image') }}</span>
              <span class="block md:hidden">{{ $t('news_feed.form.choose_your_file') }}</span>
            </div>
          </div>
        </slot>
        <label :for="name" class="hover:cursor-pointer bg-dark-purple/40 p-2.5">
          <span class="block md:hidden">{{ $t('news_feed.form.choose_file') }}</span>
          <span class="hidden md:block">{{ $t('news_feed.form.choose_your_file') }}</span></label
        >
      </div>
    </Field>
    <ErrorMessage :name="name" class="text-red-error" />
  </div>
</template>
