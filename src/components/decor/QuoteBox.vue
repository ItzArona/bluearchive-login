<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="quote-box">
    <div class="quote-box__accent" />
    <div class="quote-box__content">
      <h2 class="quote-box__title">{{ title || '与你的每天都是奇迹' }}</h2>
      <p class="quote-box__text">{{ subtitle || '奇迹永远属于相信奇迹的人！你准备相信奇迹了吗？' }}</p>
    </div>
    <div class="quote-box__cross" />
  </div>
</template>

<style scoped>
.quote-box {
  position: relative;
  padding: var(--sp-5);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  overflow: hidden;
  animation: quoteSlide 0.6s 0.4s var(--ease-out) both;
}

@keyframes quoteSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Yellow accent bar (BA signature) */
.quote-box__accent {
  position: absolute;
  top: 16px;
  left: 0;
  width: 4px;
  height: 36px;
  border-radius: 0 var(--r-pill) var(--r-pill) 0;
  background: var(--ba-yellow);
  box-shadow: 0 0 12px rgba(255, 212, 0, 0.5);
}

/* Cross decoration (BA particle) */
.quote-box__cross {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 14px;
  height: 14px;
  opacity: 0.4;
}

.quote-box__cross::before,
.quote-box__cross::after {
  content: '';
  position: absolute;
  background: white;
  border-radius: var(--r-pill);
}

.quote-box__cross::before {
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.quote-box__cross::after {
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
}

.quote-box__content {
  padding-left: var(--sp-3);
}

.quote-box__title {
  font-size: var(--fs-lg);
  font-weight: 700;
  margin-bottom: var(--sp-2);
  letter-spacing: 0.5px;
}

.quote-box__text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  opacity: 0.75;
}
</style>
