<template>
  <section class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start my-10" id="about">
    <div class="md:col-span-3">
      <h3 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <span class="w-8 h-1 bg-primary rounded-full"></span>
        {{ $t('sections.about') }}
      </h3>
    </div>
    
    <div class="md:col-span-9 mt-9">
      <div class="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-gray-100 dark:border-[#254632] shadow-sm">
        <p class="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
          {{ summary || 'Passionate developer with extensive experience in building scalable web applications and modern user interfaces.' }}
        </p>
        
        <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard 
            v-for="stat in stats" 
            :key="stat.label"
            :value="stat.value" 
            :label="stat.label" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { summary, stats } = usePortfolioData()
</script>
