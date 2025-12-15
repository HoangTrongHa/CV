<template>
  <section class="flex flex-col-reverse md:flex-row items-center gap-12 pt-10" id="hero">
    <div class="flex-1 flex flex-col gap-6 text-center md:text-left">
      <div>
        <AppBadge variant="primary" class="mb-4">
          Available for work
        </AppBadge>
        
        <h1 class="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
          Passionate <span class="text-primary">Front end</span><br/> Developer
        </h1>
        
        <h2 class="mt-4 text-xl text-slate-600 dark:text-gray-400 font-normal leading-relaxed max-w-2xl">
          {{ personalInfo.title || 'Developer specializing in Vue.js, modern web architecture, and 3D interactions.' }}
        </h2>
      </div>
      
      <!-- Contact Chips -->
      <div class="flex flex-wrap gap-3 justify-center md:justify-start">
        <ContactChip 
          v-if="personalInfo.email"
          icon="mail"
          :text="personalInfo.email"
          :href="`mailto:${personalInfo.email}`"
        />
        <ContactChip 
          v-if="personalInfo.linkedin"
          icon="link"
          :text="personalInfo.linkedin"
          :href="`https://${personalInfo.linkedin}`"
        />
        <ContactChip 
          v-if="personalInfo.github"
          icon="code"
          :text="personalInfo.github"
          :href="`https://${personalInfo.github}`"
        />
        <ContactChip 
          v-if="personalInfo.facebook"
          icon="facebook"
          text="Facebook"
          :href="personalInfo.facebook"
        />
      </div>
    </div>
    
    <div class="relative w-64 h-64 md:w-96 md:h-96 flex-shrink-0">
      <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-50 z-0"></div>
      <div class="relative z-10 border-4 border-[#254632] rounded-full shadow-2xl overflow-hidden">
        <AppAvatar3D 
          :src="personalInfo.avatar || '/images/avatar.jpg'"
          size="2xl"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { personalInfo } = usePortfolioData()
</script>
