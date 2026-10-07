export default defineAppConfig({
  ui: {
    colors: {
      primary: 'coral',
      neutral: 'zinc',
      success: 'blue'
    },
    button: { slots: { base: 'min-h-11 rounded-xl font-semibold' } },
    input: { slots: { base: 'min-h-11 rounded-xl' } },
    textarea: { slots: { base: 'rounded-xl' } },
    card: { slots: { root: 'rounded-2xl shadow-none bg-elevated' } }
  }
})
