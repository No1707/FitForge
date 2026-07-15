export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    // Private - only available server-side, never exposed to the client
    geminiApiKey: process.env.GEMINI_API_KEY || ''
  },
  future: {
    compatibilityVersion: 4
  },
  colorMode: {
    preference: 'system',
    fallback: 'light'
  },
  app: {
    head: {
      title: 'FitForge - Your Complete Exercise Library',
      meta: [
        { name: 'description', content: 'Discover exercises, learn proper form, and build your custom workout program' }
      ]
    }
  }
})
