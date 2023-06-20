<template>
  <button
    class="h-10 text-lg bg-red hover:bg-red-hover active:bg-red-active flex items-center gap-2 py-2.5 px-4 text-start border-none rounded"
  >
    <img src="@/assets/icons/cross.svg" :alt="$t('alts.cross_icon')" />
    <slot></slot>
  </button>
</template>
