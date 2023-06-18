<template>
  <div class="bg-dashboard-gradient h-screen flex flex-col items-center justify-center text-white">
    <div class="flex flex-col items-center gap-7">
      <img src="/404-soul.png" :alt="$t('alts.soul_image')" class="w-32" />
      <img src="/404-wormhole.png" :alt="$t('alts.wormhole_image')" class="w-28" />
      <h1 class="text-3xl md:text-5xl font-bold">{{ $t('not_found.whoops') }}</h1>
    </div>
    <div class="mt-2">
      <p class="text-xl md:text-2xl font-medium">
        {{ $t('not_found.we_cant_see_the_page_you_are_looking_for') }}
      </p>
    </div>
    <ActionButton link href="/" type="primary" class="mt-12">{{
      $t('not_found.return_home')
    }}</ActionButton>
  </div>
</template>
