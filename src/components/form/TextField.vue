<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
  name: string
  type?: 'text' | 'email' | 'password'
  autocomplete?: string
  error?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [field: string]
}>()

const focused = ref(false)
const showPassword = ref(false)

const hasValue = computed(() => props.modelValue.length > 0)
const isFloating = computed(() => focused.value || hasValue.value)

const inputType = computed(() => {
  if (props.type === 'password' && showPassword.value) return 'text'
  return props.type || 'text'
})

const inputId = computed(() => `field-${props.name}`)
const errorId = computed(() => `error-${props.name}`)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function onFocus() {
  focused.value = true
}

function onBlur() {
  focused.value = false
  emit('blur', props.name)
}

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="text-field" :class="{ focused, error: !!error, floating: isFloating }">
    <div class="text-field__wrapper">
      <label :for="inputId" class="text-field__label">{{ label }}</label>
      <slot name="icon-left" />
      <input
        :id="inputId"
        :type="inputType"
        :name="name"
        :value="modelValue"
        :autocomplete="autocomplete"
        :placeholder="isFloating ? placeholder : undefined"
        :aria-describedby="error ? errorId : undefined"
        :aria-invalid="!!error"
        class="text-field__input"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      >
      <button
        v-if="type === 'password'"
        type="button"
        class="text-field__toggle"
        :aria-label="showPassword ? '隐藏密码' : '显示密码'"
        tabindex="-1"
        @click="togglePassword"
      >
        <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
      <slot name="action-right" />
      <!-- Glow ring on focus -->
      <span class="text-field__glow" />
    </div>
    <Transition name="error-msg">
      <p v-if="error" :id="errorId" class="text-field__error" role="alert">{{ error }}</p>
    </Transition>
  </div>
</template>

<style scoped>
.text-field {
  position: relative;
  margin-bottom: var(--sp-4);
}

.text-field__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1.5px solid var(--ink-200);
  border-radius: 12px;
  background: var(--ink-100);
  transition: all 0.25s var(--ease-out);
  overflow: hidden;
}

.text-field.focused .text-field__wrapper {
  border-color: var(--ba-blue-500);
  background: var(--paper);
  box-shadow: 0 0 0 4px rgba(18, 138, 250, 0.08);
}

.text-field.error .text-field__wrapper {
  border-color: var(--danger);
  background: var(--paper);
  box-shadow: 0 0 0 4px rgba(242, 88, 91, 0.08);
}

/* Glow effect */
.text-field__glow {
  position: absolute;
  inset: -1px;
  border-radius: 12px;
  pointer-events: none;
  opacity: 0;
  background: conic-gradient(
    from 0deg,
    var(--ba-blue-300),
    var(--ba-yellow),
    var(--ba-pink),
    var(--ba-blue-300)
  );
  filter: blur(6px);
  z-index: -1;
  transition: opacity 0.3s;
}

.text-field.focused .text-field__glow {
  opacity: 0.15;
  animation: glowRotate 4s linear infinite;
}

@keyframes glowRotate {
  from { filter: blur(6px) hue-rotate(0deg); }
  to { filter: blur(6px) hue-rotate(360deg); }
}

/* Label */
.text-field__label {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--fs-md);
  color: var(--ink-500);
  pointer-events: none;
  transition: all 0.2s var(--ease-out);
  z-index: 1;
}

.text-field.floating .text-field__label {
  top: 8px;
  transform: translateY(0);
  font-size: 11px;
  font-weight: 500;
  color: var(--ba-blue-500);
}

.text-field.error.floating .text-field__label {
  color: var(--danger);
}

/* Input */
.text-field__input {
  width: 100%;
  padding: 22px 14px 8px;
  border: none;
  border-radius: 12px;
  background: transparent;
  font-size: var(--fs-md);
  outline: none;
  color: var(--ink-900);
  line-height: 1.4;
}

.text-field__input::placeholder {
  color: var(--ink-500);
  opacity: 0.5;
}

/* Password toggle */
.text-field__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--ink-500);
  cursor: pointer;
  border-radius: 8px;
  margin-right: 6px;
  flex-shrink: 0;
  transition: all 0.2s;
}

.text-field__toggle:hover {
  color: var(--ba-blue-500);
  background: rgba(18, 138, 250, 0.08);
}

/* Error message */
.text-field__error {
  margin-top: 6px;
  padding-left: 14px;
  font-size: 12px;
  color: var(--danger);
  font-weight: 500;
}

.error-msg-enter-active {
  transition: all 0.25s var(--ease-out);
}

.error-msg-leave-active {
  transition: all 0.15s var(--ease-out);
}

.error-msg-enter-from,
.error-msg-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
