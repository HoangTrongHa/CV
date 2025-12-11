<template>
  <div>
    <div class="flex justify-between mb-2">
      <span class="font-semibold dark:text-gray-200">{{ name }}</span>
      <span class="text-primary font-bold">{{ years }} {{ years > 1 ? 'years' : 'year' }}</span>
    </div>
    <AppProgressBar :value="(years / 7) * 100" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  years: number
}

defineProps<Props>()
</script>
