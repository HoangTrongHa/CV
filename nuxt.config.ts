// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss'],
  
  pages: true,
  
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },
  
  app: {
    head: {
      title: 'Ha Hoang Trong - Professional CV',
      htmlAttrs: {
        lang: 'en',
        class: 'dark'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Senior Full Stack Developer specializing in Vue.js, modern web architecture, and 3D interactions.' },
        { property: 'og:title', content: 'Ha Hoang Trong - Professional CV' },
        { property: 'og:description', content: 'Senior Full Stack Developer specializing in Vue.js, modern web architecture, and 3D interactions.' },
        { property: 'og:image', content: '/images/avatar.jpg' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Ha Hoang Trong - Professional CV' },
        { name: 'twitter:description', content: 'Senior Full Stack Developer specializing in Vue.js, modern web architecture, and 3D interactions.' },
        { name: 'twitter:image', content: '/images/avatar.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/images/avatar.jpg' },
        { rel: 'apple-touch-icon', href: '/images/avatar.jpg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
      ]
    }
  }
})
