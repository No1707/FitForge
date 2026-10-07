export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  ui: { fonts: false },
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
    preference: 'light',
    fallback: 'light'
  },
  app: {
    head: {
      title: 'FitForge · Suivi de musculation',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'description', content: 'Crée tes programmes de musculation et enregistre les charges et répétitions de chaque séance.' },
        { name: 'theme-color', content: '#252528' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
      ]
    }
  }
})
