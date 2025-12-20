<template>
  <a 
    v-if="!isPage"
    :href="href"
    class="hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
    @click.prevent="smoothScroll"
  >
    {{ text }}
  </a>
  <NuxtLink
    v-else
    :to="href"
    class="hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  text: string
  href: string
  isPage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isPage: false
})

const smoothScroll = () => {
  const targetId = props.href.replace('#', '')
  const targetElement = document.getElementById(targetId)
  
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>
