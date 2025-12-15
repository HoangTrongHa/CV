<template>
  <div>
    <!-- Loading Screen -->
    <AppLoading :is-loading="isLoading" :loading-text="$t('project.loadingProject')" />
    
    <!-- Main Content with Fade Transition -->
    <Transition name="page-fade">
      <div v-if="!isLoading" class="min-h-screen bg-gray-50 dark:bg-background-dark py-12">
        <div class="container mx-auto px-4 max-w-5xl">
      <!-- Back Button -->
      <NuxtLink 
        to="/#portfolio"
        class="inline-flex items-center gap-2 text-primary hover:underline mb-8"
      >
        <AppIcon name="arrow_back" size="20px" />
        {{ $t('project.backToPortfolio') }}
      </NuxtLink>

      <!-- Project Not Found -->
      <div v-if="!project" class="text-center py-20">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">{{ $t('project.projectNotFound') }}</h2>
        <p class="text-slate-600 dark:text-gray-400 mb-8">{{ $t('project.projectNotFoundDesc') }}</p>
        <NuxtLink 
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          {{ $t('project.goHome') }}
        </NuxtLink>
      </div>

      <!-- Project Details -->
      <div v-else class="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-[#254632] shadow-lg">
        <!-- Project Image -->
        <div class="h-96 relative bg-gray-100 dark:bg-gray-800">
          <div 
            class="w-full h-full bg-contain bg-center bg-no-repeat"
            :style="{ backgroundImage: `url(${project.image})` }"
          />
        </div>

        <!-- Project Content -->
        <div class="p-8 md:p-12">
          <!-- Title & Period -->
          <div class="mb-6">
            <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-3">{{ project.title }}</h1>
            <p class="text-sm text-slate-500 dark:text-gray-400 flex items-center gap-2">
              <AppIcon name="schedule" size="18px" />
              {{ project.period }}
            </p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-8">
            <AppBadge 
              v-for="tag in project.tags" 
              :key="tag"
              :label="tag"
              variant="primary"
            />
          </div>

          <!-- Description -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AppIcon name="description" class="text-primary" />
              {{ $t('project.projectDescription') }}
            </h3>
            <p class="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <!-- Project Link -->
          <div v-if="project.link && project.link !== '#'" class="mb-8">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AppIcon name="link" class="text-primary" />
              {{ $t('project.projectLink') }}
            </h3>
            <a 
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
            >
              {{ $t('project.visitWebsite') }}
              <AppIcon name="open_in_new" size="20px" />
            </a>
          </div>

          <!-- Technologies Used -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AppIcon name="code" class="text-primary" />
              {{ $t('project.technologiesUsed') }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                v-for="tag in project.tags" 
                :key="tag"
                class="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <AppIcon name="check_circle" size="20px" class="text-primary" />
                <span class="text-sm font-medium text-slate-700 dark:text-gray-300">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Projects -->
      <div v-if="project && relatedProjects.length > 0" class="mt-12">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <AppIcon name="apps" class="text-primary" />
          {{ $t('project.relatedProjects') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PortfolioCard 
            v-for="relatedProject in relatedProjects" 
            :key="relatedProject.title"
            :title="relatedProject.title"
            :description="relatedProject.description"
            :image="relatedProject.image"
            :link="relatedProject.link"
            :slug="createSlug(relatedProject.title)"
          />
        </div>
      </div>
    </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { projects } = usePortfolioData()
const isLoading = ref(true)

onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

// Create slug from title
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Find current project by slug
const project = computed(() => {
  const slug = route.params.slug as string
  return projects.value.find(p => createSlug(p.title) === slug)
})

// Get related projects (same tags or recent projects)
const relatedProjects = computed(() => {
  if (!project.value) return []
  
  const currentTags = project.value.tags || []
  const otherProjects = projects.value.filter(p => p.title !== project.value?.title)
  
  // Find projects with matching tags
  const projectsWithMatchingTags = otherProjects
    .map(p => ({
      ...p,
      matchCount: (p.tags || []).filter(tag => currentTags.includes(tag)).length
    }))
    .filter(p => p.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3)
  
  // If not enough related projects, add recent ones
  if (projectsWithMatchingTags.length < 3) {
    const remaining = 3 - projectsWithMatchingTags.length
    const recentProjects = otherProjects
      .filter(p => !projectsWithMatchingTags.find(rp => rp.title === p.title))
      .slice(0, remaining)
    return [...projectsWithMatchingTags, ...recentProjects]
  }
  
  return projectsWithMatchingTags
})

// Meta tags for SEO
useHead({
  title: computed(() => project.value ? `${project.value.title} - Ha Hoang Trong` : 'Project Not Found'),
  meta: [
    {
      name: 'description',
      content: computed(() => project.value?.description || 'Project details')
    }
  ]
})
</script>

<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
