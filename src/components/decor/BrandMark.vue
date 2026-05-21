<script setup lang="ts">
</script>

<template>
  <div class="brand-mark">
    <span class="brand-mark__icon">BA</span>
    <span class="brand-mark__text">BlueArchive</span>
  </div>
</template>

<style scoped>
.brand-mark {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-6);
}

.brand-mark__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--r-sm);
  background: var(--ba-blue-500);
  color: white;
  font-weight: 700;
  font-size: var(--fs-sm);
}

.brand-mark__text {
  font-size: var(--fs-lg);
  font-weight: 600;
  color: var(--ink-900);
  letter-spacing: 0.5px;
}
</style>
