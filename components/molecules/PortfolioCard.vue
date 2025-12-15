<template>
  <div class="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-[#254632] shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300">
    <div class="h-48 overflow-hidden relative bg-gray-50 dark:bg-gray-800">
      <div class="absolute inset-0 bg-transparent group-hover:bg-transparent transition-colors z-10"></div>
      <div 
        class="w-full h-full bg-contain bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-500 "
        :style="{ backgroundImage: `url(${image})` }"
      />
    </div>
    <div class="p-6">
      <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ title }}</h4>
      <p class="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-2">{{ description }}</p>
      <NuxtLink 
        :to="`/projects/${slug}`"
        class="inline-flex items-center text-primary font-bold text-sm hover:underline"
      >
        {{ $t('project.viewProject') }}
        <AppIcon name="arrow_outward" size="16px" class="ml-1" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  image?: string
  link: string
  slug?: string
}

const props = defineProps<Props>()

// Create slug from title if not provided
const slug = computed(() => {
  if (props.slug) return props.slug
  return props.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
})
</script>
