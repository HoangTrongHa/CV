<template>
  <div class="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-[#254632] shadow-sm flex items-start gap-4">
    <div class="bg-primary/10 p-3 rounded-full text-primary">
      <AppIcon :name="icon" size="28px" />
    </div>
    <div>
      <h4 class="text-lg font-bold text-slate-900 dark:text-white">{{ title }}</h4>
      <p class="text-slate-600 dark:text-gray-300 mt-1">{{ institution }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">{{ period }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  institution: string
  period: string
}

defineProps<Props>()
</script>
