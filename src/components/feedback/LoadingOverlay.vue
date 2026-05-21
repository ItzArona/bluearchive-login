<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 300)
})
</script>

<template>
  <Transition name="overlay">
    <div v-if="visible" class="loading-overlay">
      <div class="loading-spinner" />
    </div>
  </Transition>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper);
  z-index: 9999;
}

.loading-spinner {
  width: 44px;
  height: 44px;
  border: 3px solid var(--ba-blue-100);
  border-top-color: var(--ba-blue-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.overlay-leave-active {
  transition: opacity 0.3s var(--ease-out);
}

.overlay-leave-to {
  opacity: 0;
}
</style>
