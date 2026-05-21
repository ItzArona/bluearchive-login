<script setup lang="ts">
</script>

<template>
  <div class="brand-mark">
    <img src="/ba-logo.png" alt="Blue Archive" class="brand-mark__logo" />
  </div>
</template>

<style scoped>
.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--sp-5);
  animation: brandFloat 0.6s 0.2s var(--ease-out) both;
}

@keyframes brandFloat {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.brand-mark__logo {
  width: 52px;
  height: 52px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(18, 138, 250, 0.3));
  transition: transform 0.3s var(--ease-spring);
}

.brand-mark__logo:hover {
  transform: scale(1.1) rotate(-3deg);
}
</style>
