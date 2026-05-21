<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label: string
  name: string
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const inputId = computed(() => `checkbox-${props.name}`)

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <div class="checkbox" :class="{ error: !!error }">
    <input
      :id="inputId"
      type="checkbox"
      :name="name"
      :checked="modelValue"
      class="checkbox__input"
      @change="onChange"
    >
    <label :for="inputId" class="checkbox__label">
      <span class="checkbox__box">
        <svg v-show="modelValue" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <span class="checkbox__text">
        <slot>{{ label }}</slot>
      </span>
    </label>
    <p v-if="error" class="checkbox__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.checkbox {
  margin-bottom: var(--sp-3);
}

.checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.checkbox__label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  cursor: pointer;
  font-size: var(--fs-sm);
  color: var(--ink-700);
}

.checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--ink-200);
  border-radius: var(--r-sm);
  background: var(--paper);
  color: white;
  transition: all 0.15s var(--ease-out);
  flex-shrink: 0;
}

.checkbox__input:checked + .checkbox__label .checkbox__box {
  background: var(--ba-blue-500);
  border-color: var(--ba-blue-500);
}

.checkbox__input:focus-visible + .checkbox__label .checkbox__box {
  box-shadow: 0 0 0 4px var(--ba-blue-50);
}

.checkbox.error .checkbox__box {
  border-color: var(--danger);
}

.checkbox__text a {
  color: var(--ba-blue-500);
  text-decoration: underline;
}

.checkbox__error {
  margin-top: var(--sp-1);
  font-size: var(--fs-xs);
  color: var(--danger);
}
</style>
