<template>
  <AppExpansionPanel :title="question">
    <div class="prose prose-sm dark:prose-invert max-w-none">
      <div v-html="answer" class="text-gray-700 dark:text-gray-300" @click.capture="handleClick" @mousedown.capture="preventNavigation"></div>
    </div>
  </AppExpansionPanel>
</template>

<script setup lang="ts">
interface Props {
  question: string
  answer: string
}

defineProps<Props>()

const preventNavigation = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  
  // Prevent any navigation from images or links to local resources
  if (target.tagName === 'IMG' || target.tagName === 'A') {
    const href = target.tagName === 'A' ? target.getAttribute('href') : target.getAttribute('src')
    
    if (href && !href.startsWith('http://') && !href.startsWith('https://')) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}

const handleClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  
  // Prevent navigation for image clicks
  if (target.tagName === 'IMG') {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  // Prevent navigation for links in code examples
  if (target.tagName === 'A') {
    const href = target.getAttribute('href')
    
    // Block navigation to example files (CSS, images, etc.)
    if (href && (
      href.endsWith('.css') ||
      href.endsWith('.jpg') ||
      href.endsWith('.jpeg') ||
      href.endsWith('.png') ||
      href.endsWith('.gif') ||
      href.endsWith('.svg') ||
      href.endsWith('.js') ||
      href.endsWith('.mp3') ||
      href.endsWith('.mp4') ||
      href.startsWith('/interview-assets/') ||
      href.startsWith('style') ||
      href.includes('placeholder') ||
      href.includes('sprite') ||
      href.includes('img_') ||
      href.includes('image') ||
      href.includes('audio') ||
      href.includes('video')
    )) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    
    // Allow external links to open in new tab
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      event.preventDefault()
      window.open(href, '_blank')
    }
  }
}
</script>
