<template>
  <a 
    :href="href"
    class="hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
    @click.prevent="smoothScroll"
  >
    {{ text }}
  </a>
</template>

<script setup lang="ts">
interface Props {
  text: string
  href: string
}

const props = defineProps<Props>()

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
