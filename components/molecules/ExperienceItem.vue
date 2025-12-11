<template>
  <div class="relative pl-8 md:pl-12">
    <span class="absolute -left-[9px] top-1 w-[18px] h-[18px] rounded-full bg-background-light dark:bg-background-dark border-4 border-primary"></span>
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
      <h4 class="text-xl font-bold text-slate-900 dark:text-white">{{ title }}</h4>
      <AppBadge variant="primary" class="w-fit mt-2 sm:mt-0">{{ period }}</AppBadge>
    </div>
    
    <div class="flex items-center gap-3 mb-4">
      <img 
        v-if="image && image !== '#'" 
        :src="image" 
        :alt="company"
        class="h-8 w-auto object-contain dark:brightness-0 dark:invert"
        @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
      />
      <h5 class="text-lg text-slate-600 dark:text-gray-300 font-medium">{{ company }}</h5>
    </div>
    
    <div class="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-[#254632] shadow-sm">
      <ul class="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-400">
        <li v-for="(item, index) in responsibilities" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  company: string
  period: string
  responsibilities: string[]
  image?: string
}

defineProps<Props>()
</script>
