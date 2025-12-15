<template>
  <section class="my-10" id="skills">
    <div class="columns-1 md:columns-2 gap-8 space-y-8">
      <div v-for="category in skills" :key="category.category" class="break-inside-avoid mb-8">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <AppIcon name="terminal" class="text-primary" />
          {{ category.category }}
        </h3>
        
        <div class="flex flex-col gap-6">
          <SkillBar 
            v-for="skill in category.items" 
            :key="skill.name"
            :name="skill.name"
            :years="skill.years"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { skills } = usePortfolioData()
</script>
