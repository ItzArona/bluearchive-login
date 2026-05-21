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
    <span class="submit-btn__shine" />
    <span class="submit-btn__bg" />
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
  padding: 16px var(--sp-5);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: var(--fs-lg);
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.2s var(--ease-out), box-shadow 0.3s var(--ease-out);
  box-shadow:
    0 8px 24px -6px rgba(18, 138, 250, 0.5),
    0 2px 8px rgba(18, 138, 250, 0.2);
}

.submit-btn__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  background: linear-gradient(
    135deg,
    var(--ba-blue-500) 0%,
    #3d9fff 25%,
    var(--ba-blue-500) 50%,
    #0a66c2 100%
  );
  background-size: 300% 300%;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Holographic shine sweep */
.submit-btn__shine {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 45%,
    rgba(255, 212, 0, 0.15) 50%,
    rgba(255, 255, 255, 0.3) 55%,
    transparent 70%
  );
  background-size: 250% 100%;
  animation: shineSweep 3s 1s ease-in-out infinite;
}

@keyframes shineSweep {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.01);
  box-shadow:
    0 12px 32px -6px rgba(18, 138, 250, 0.6),
    0 4px 12px rgba(18, 138, 250, 0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
  box-shadow:
    0 4px 12px -4px rgba(18, 138, 250, 0.4),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn:disabled .submit-btn__shine {
  animation: none;
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

.submit-btn__text {
  position: relative;
  z-index: 1;
  transition: opacity 0.2s;
}

.submit-btn__text.invisible {
  opacity: 0;
}
</style>
