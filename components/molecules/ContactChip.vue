<template>
  <a 
    target="_blank"
    :href="href"
    class="flex items-center gap-2 bg-white dark:bg-[#1a2c23] border border-gray-200 dark:border-[#254632] hover:border-primary dark:hover:border-primary px-4 py-2 rounded-full transition-all group"
  >
    <AppIcon :name="icon" size="20px" class="text-gray-500 group-hover:text-primary transition-colors" />
    <span class="text-sm font-medium">{{ text }}</span>
  </a>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  text: string
  href: string
}

defineProps<Props>()
</script>
