<script setup lang="ts">
import TextField from './TextField.vue'

const props = defineProps<{
  modelValue: string
  email: string
  error?: string
  isCounting: boolean
  remaining: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [field: string]
  requestCode: []
}>()

function onRequestCode() {
  if (!props.isCounting) {
    emit('requestCode')
  }
}
</script>

<template>
  <TextField
    :model-value="modelValue"
    label="验证码"
    name="code"
    type="text"
    autocomplete="one-time-code"
    placeholder="6 位数字"
    :error="error"
    @update:model-value="v => emit('update:modelValue', v)"
    @blur="field => emit('blur', field)"
  >
    <template #action-right>
      <button
        type="button"
        class="code-btn"
        :class="{ disabled: isCounting || !email }"
        :disabled="isCounting || !email"
        @click="onRequestCode"
      >
        {{ isCounting ? `${remaining}s` : '获取验证码' }}
      </button>
    </template>
  </TextField>
</template>

<style scoped>
.code-btn {
  white-space: nowrap;
  padding: var(--sp-2) var(--sp-3);
  border: none;
  border-radius: var(--r-sm);
  background: transparent;
  color: var(--ba-blue-500);
  font-size: var(--fs-sm);
  font-weight: 500;
  cursor: pointer;
  margin-right: var(--sp-2);
  flex-shrink: 0;
  transition: all 0.2s var(--ease-out);
}

.code-btn:hover:not(.disabled) {
  background: var(--ba-blue-50);
}

.code-btn.disabled {
  color: var(--ink-500);
  cursor: not-allowed;
}
</style>
