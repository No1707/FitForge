export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    // Private - only available server-side, never exposed to the client
    geminiApiKey: process.env.GEMINI_API_KEY || ''
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    // We protect specific routes ourselves via app/middleware/auth.ts instead
    // of the module's default "protect everything except an exclude list".
    redirect: false
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
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
      ]
    }
  }
})
