<template>
  <div class="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-[#254632] shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300">
    <div class="h-48 overflow-hidden relative">
      <div class="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
      <div 
        class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
        :style="{ backgroundImage: `url(${image})` }"
      />
    </div>
    <div class="p-6">
      <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ title }}</h4>
      <p class="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-2">{{ description }}</p>
      <a 
        :href="link"
        class="inline-flex items-center text-primary font-bold text-sm hover:underline"
      >
        View Project 
        <AppIcon name="arrow_outward" size="16px" class="ml-1" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  image?: string
  link: string
}

defineProps<Props>()
</script>
