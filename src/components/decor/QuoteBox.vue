<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="quote-box">
    <h2 class="quote-box__title">{{ title || '与你的每天都是奇迹' }}</h2>
    <p class="quote-box__text">{{ subtitle || '奇迹永远属于相信奇迹的人！你准备相信奇迹了吗？' }}</p>
  </div>
</template>

<style scoped>
.quote-box {
  padding: var(--sp-6) var(--sp-5);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  border-radius: var(--r-lg);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
  color: white;
}

.quote-box__title {
  font-size: var(--fs-xl);
  font-weight: 700;
  margin-bottom: var(--sp-3);
  letter-spacing: 1px;
}

.quote-box__text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  opacity: 0.85;
}
</style>
