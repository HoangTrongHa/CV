<template>
  <section id="education" class="mx-10">
    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
      <AppIcon name="school" class="text-primary" />
      {{ $t('sections.education') }}
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EducationCard 
        v-for="edu in education" 
        :key="edu.degree"
        icon="account_balance"
        :title="edu.degree"
        :institution="edu.school"
        :period="edu.period"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const { education } = usePortfolioData()
</script>
