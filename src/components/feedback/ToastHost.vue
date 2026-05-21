<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToast, type ToastItem } from '@/composables/useToast'

const { toasts, dismiss } = useToast()

const timers = ref<Map<number, ReturnType<typeof setTimeout>>>(new Map())

function startTimer(id: number) {
  const timer = setTimeout(() => {
    dismiss(id)
    timers.value.delete(id)
  }, 4000)
  timers.value.set(id, timer)
}

function pauseTimer(id: number) {
  const timer = timers.value.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.value.delete(id)
  }
}

function resumeTimer(id: number) {
  startTimer(id)
}

watch(toasts, (items) => {
  for (const item of items) {
    if (!timers.value.has(item.id)) {
      startTimer(item.id)
    }
  }
}, { deep: true })
</script>

<template>
  <Teleport to="body">
    <div class="toast-host" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="item in toasts"
          :key="item.id"
          class="toast-item"
          :class="[item.type]"
          @mouseenter="pauseTimer(item.id)"
          @mouseleave="resumeTimer(item.id)"
        >
          <div class="toast-item__bar" />
          <div class="toast-item__content">
            <p class="toast-item__title">{{ item.title }}</p>
            <p v-if="item.message" class="toast-item__message">{{ item.message }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-host {
  position: fixed;
  top: var(--sp-5);
  right: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  z-index: 10000;
  pointer-events: none;
}

.toast-item {
  display: flex;
  overflow: hidden;
  background: var(--paper);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-lg);
  max-width: 340px;
  pointer-events: auto;
  cursor: default;
}

.toast-item__bar {
  width: 4px;
  flex-shrink: 0;
}

.toast-item.success .toast-item__bar { background: var(--success); }
.toast-item.error .toast-item__bar { background: var(--danger); }
.toast-item.info .toast-item__bar { background: var(--ba-blue-500); }

.toast-item__content {
  padding: var(--sp-3) var(--sp-4);
}

.toast-item__title {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--ink-900);
}

.toast-item__message {
  margin-top: var(--sp-1);
  font-size: var(--fs-xs);
  color: var(--ink-700);
}

.toast-enter-active {
  transition: all 0.35s var(--ease-spring);
}

.toast-leave-active {
  transition: all 0.25s var(--ease-out);
}

.toast-enter-from {
  transform: translateX(120%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
