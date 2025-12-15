<template>
  <div>
    <!-- Loading Screen -->
    <AppLoading :is-loading="isLoading" loading-text="Welcome..." />
    
    <!-- Main Content with Fade Transition -->
    <Transition name="page-fade">
      <div v-if="!isLoading">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <PortfolioSection />
        <AppFooter />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)

onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

useHead({
  title: 'Ha Hoang Trong - Professional CV',
  meta: [
    { name: 'description', content: 'Senior Full Stack Developer specializing in Vue.js, modern web architecture, and 3D interactions.' }
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
