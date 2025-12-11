<template>
  <section id="experience" class="my-10">
    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
      <AppIcon name="work_history" class="text-primary" />
      Work Experience
    </h3>
    
    <div class="relative border-l-2 border-gray-200 dark:border-[#254632] ml-4 md:ml-6 space-y-12">
      <ExperienceItem 
        v-for="exp in experience" 
        :key="exp.company + exp.period"
        :title="exp.position"
        :company="exp.company"
        :period="exp.period"
        :responsibilities="exp.highlights"
        :image="exp.images"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const { experience } = usePortfolioData()
</script>
