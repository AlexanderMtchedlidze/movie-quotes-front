<script setup></script>

<template>
  <header class="flex justify-between pt-8 px-16">
    <h3 class="uppercase font-medium text-creme-brulee">movie quotes</h3>
    <div class="flex gap-8 items-center">
      <LangDropdown />
      <nav>
        <ul class="flex gap-4">
          <li>
            <ActionButton type="primary">Sign Up</ActionButton>
          </li>
          <li>
            <ActionButton type="outline">Log in</ActionButton>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <main class="flex flex-col gap-8 items-center justify-center h-[70%]">
    <p class="text-creme-brulee font-bold text-6xl text-center">
      Find any quote in <br />
      millions of movie lines
    </p>
    <ActionButton type="primary" padding="sm">Get started</ActionButton>
  </main>
</template>

<style scoped></style>
