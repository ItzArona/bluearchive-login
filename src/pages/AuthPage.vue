<script setup lang="ts">
import QuoteBox from '@/components/decor/QuoteBox.vue'
import BrandMark from '@/components/decor/BrandMark.vue'
import AuthForm from '@/components/form/AuthForm.vue'
</script>

<template>
  <div class="auth-page">
    <!-- Video background -->
    <video
      class="auth-page__video"
      autoplay
      muted
      loop
      playsinline
      preload="none"
      poster="/bg.jpg"
    >
      <source src="/bg-video.mp4" type="video/mp4">
    </video>
    <div class="auth-page__video-overlay" />

    <!-- Floating particles -->
    <div class="auth-page__particles">
      <span v-for="i in 6" :key="i" class="particle" :style="{ '--i': i }" />
    </div>

    <!-- Main container -->
    <div class="auth-page__container">
      <aside class="auth-page__left">
        <div class="auth-page__left-inner">
          <QuoteBox />
        </div>
      </aside>

      <main class="auth-page__right">
        <BrandMark />
        <AuthForm />
      </main>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-5);
  overflow: hidden;
}

/* Video background */
.auth-page__video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.auth-page__video-overlay {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(18, 138, 250, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(254, 147, 199, 0.1) 0%, transparent 50%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
}

/* Floating particles (cross-shaped, BA signature) */
.auth-page__particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  width: 12px;
  height: 12px;
  opacity: 0;
  animation: particleFloat 8s calc(var(--i) * 1.2s) infinite;
}

.particle::before,
.particle::after {
  content: '';
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--r-pill);
}

.particle::before {
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.particle::after {
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
}

.particle:nth-child(1) { left: 15%; top: 20%; }
.particle:nth-child(2) { left: 70%; top: 15%; }
.particle:nth-child(3) { left: 85%; top: 60%; }
.particle:nth-child(4) { left: 25%; top: 75%; }
.particle:nth-child(5) { left: 55%; top: 85%; }
.particle:nth-child(6) { left: 90%; top: 35%; }

@keyframes particleFloat {
  0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
  20% { opacity: 0.8; }
  50% { opacity: 0.6; transform: translateY(-30px) scale(1); }
  80% { opacity: 0.3; }
}

/* Container with glass effect */
.auth-page__container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  width: 100%;
  max-width: 1000px;
  min-height: 560px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  box-shadow:
    0 32px 64px -16px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  animation: containerReveal 0.8s var(--ease-out) both;
}

@keyframes containerReveal {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Left side with image */
.auth-page__left {
  position: relative;
  background: url('/bg.jpg') center / cover no-repeat;
  display: flex;
  align-items: flex-end;
}

.auth-page__left::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
}

.auth-page__left-inner {
  position: relative;
  z-index: 1;
  padding: var(--sp-6);
  width: 100%;
}

/* Right side form */
.auth-page__right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--sp-8) var(--sp-6);
  background: rgba(255, 255, 255, 0.95);
}

@media (prefers-color-scheme: dark) {
  .auth-page__right {
    background: rgba(17, 22, 42, 0.92);
  }
}

/* Tablet */
@media (max-width: 1024px) and (min-width: 768px) {
  .auth-page__container {
    grid-template-columns: 1fr;
    max-width: 460px;
  }

  .auth-page__left {
    display: none;
  }

  .auth-page__right {
    border-radius: 24px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .auth-page {
    padding: var(--sp-3);
    align-items: flex-start;
    padding-top: 10vh;
  }

  .auth-page__container {
    grid-template-columns: 1fr;
    max-width: 400px;
    border-radius: 20px;
  }

  .auth-page__left {
    display: none;
  }

  .auth-page__right {
    padding: var(--sp-6) var(--sp-5);
  }

  .auth-page__particles {
    display: none;
  }
}
</style>
