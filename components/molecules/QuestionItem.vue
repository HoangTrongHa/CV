<template>
  <AppExpansionPanel :title="question">
    <div class="prose prose-sm dark:prose-invert max-w-none">
      <div v-html="answer" class="text-gray-700 dark:text-gray-300"></div>
    </div>
  </AppExpansionPanel>
</template>

<script setup lang="ts">
interface Props {
  question: string
  answer: string
}

defineProps<Props>()
</script>
