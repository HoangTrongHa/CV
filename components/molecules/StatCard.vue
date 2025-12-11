<template>
  <div class="text-center p-4 bg-background-light dark:bg-background-dark rounded-xl">
    <span class="block text-3xl font-black text-primary mb-1">{{ value }}</span>
    <span class="text-xs text-gray-500 uppercase tracking-wider font-semibold">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string | number
  label: string
}

defineProps<Props>()
</script>
