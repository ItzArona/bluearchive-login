<script setup lang="ts">
defineProps<{
  loading?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button
    type="submit"
    class="submit-btn"
    :class="{ loading }"
    :disabled="loading || disabled"
  >
    <span v-if="loading" class="submit-btn__spinner" />
    <span class="submit-btn__text" :class="{ invisible: loading }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.submit-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px var(--sp-5);
  border: none;
  border-radius: var(--r-md);
  background: linear-gradient(180deg, var(--ba-blue-300) 0%, var(--ba-blue-500) 50%, var(--ba-blue-700) 100%);
  color: white;
  font-size: var(--fs-lg);
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.2s var(--ease-out);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.98);
  box-shadow: var(--shadow-sm), inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn__spinner {
  position: absolute;
  width: 22px;
  height: 22px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.submit-btn__text.invisible {
  opacity: 0;
}
</style>
