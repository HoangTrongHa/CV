<template>
  <nav class="sticky top-0 z-50 w-full backdrop-blur-md bg-background-light/80 dark:bg-background-dark/80 border-b border-gray-200 dark:border-[#254632]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0 flex items-center gap-3">
          <AppLogo name="Ha Hoang Trong" initials="HH" />
        </div>
        
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <NavLink 
              v-for="link in navLinks" 
              :key="link.href"
              :text="link.text"
              :href="link.href"
            />
          </div>
        </div>
        
        <div>
          <AppButton href="#contact" size="sm" @click.prevent="scrollToContact">
            Get My CV File
          </AppButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { text: 'About', href: '#about' },
  { text: 'Skills', href: '#skills' },
  { text: 'Experience', href: '#experience' },
  { text: 'Education', href: '#education' },
  { text: 'Portfolio', href: '#portfolio' }
]

const scrollToContact = () => {
  const contactElement = document.getElementById('contact')
  if (contactElement) {
    contactElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>
