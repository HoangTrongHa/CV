<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-display antialiased selection:bg-primary selection:text-black">
    <AppNavigation />
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-24">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
