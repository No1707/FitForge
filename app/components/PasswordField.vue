<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const model = defineModel<string>({ default: '' })
withDefaults(defineProps<{ label: string, autocomplete?: 'current-password' | 'new-password', minlength?: number }>(), { autocomplete: 'current-password' })
const visible = ref(false)
const inputId = useId()
</script>

<template>
  <div>
    <label :for="inputId" class="block text-sm font-semibold">{{ label }}</label>
    <div class="relative mt-2">
      <input :id="inputId" v-model="model" v-bind="$attrs" :type="visible ? 'text' : 'password'" :autocomplete="autocomplete" :minlength="minlength" required class="ff-field ff-password-input" />
      <button type="button" class="ff-password-toggle" :aria-label="visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'" :aria-pressed="visible" :aria-controls="inputId" @click="visible = !visible">
        <UIcon :name="visible ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="size-5" />
      </button>
    </div>
    <slot />
  </div>
</template>
