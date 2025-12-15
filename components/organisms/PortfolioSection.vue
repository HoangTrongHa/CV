<template>
  <section id="portfolio" class="my-10">
    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
      <AppIcon name="grid_view" class="text-primary" />
      {{ $t('sections.portfolio') }}
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PortfolioCard 
        v-for="project in projects" 
        :key="project.title"
        :title="project.title"
        :description="project.description"
        :image="project.image"
        :link="project.link"
        :slug="createSlug(project.title)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const { projects } = usePortfolioData()

// Create slug from title
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
</script>
