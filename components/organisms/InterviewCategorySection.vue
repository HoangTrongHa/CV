<template>
  <section class="mb-12">
    <div class="flex items-center gap-4 mb-6">
      <div 
        class="w-12 h-12 rounded-lg flex items-center justify-center"
        :style="{ backgroundColor: color + '20' }"
      >
        <span 
          class="material-symbols-outlined text-2xl"
          :style="{ color: color }"
        >
          {{ icon }}
        </span>
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ category }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ questions.length }} câu hỏi
        </p>
      </div>
    </div>
    
    <div class="space-y-3">
      <QuestionItem
        v-for="(item, index) in questions"
        :key="index"
        :question="item.question"
        :answer="item.answer"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Question {
  question: string
  answer: string
}

interface Props {
  category: string
  icon: string
  color: string
  questions: Question[]
}

defineProps<Props>()
</script>
