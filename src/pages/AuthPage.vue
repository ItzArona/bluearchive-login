<script setup lang="ts">
import QuoteBox from '@/components/decor/QuoteBox.vue'
import BrandMark from '@/components/decor/BrandMark.vue'
import AuthForm from '@/components/form/AuthForm.vue'
</script>

<template>
  <div class="auth-page">
    <div class="auth-page__halo auth-page__halo--blue" />
    <div class="auth-page__halo auth-page__halo--pink" />

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

.auth-page__halo {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: drift 30s linear infinite;
}

.auth-page__halo--blue {
  width: 800px;
  height: 800px;
  top: -300px;
  right: -200px;
  background: radial-gradient(circle, var(--ba-blue-50) 0%, transparent 70%);
  opacity: 0.7;
}

.auth-page__halo--pink {
  width: 600px;
  height: 600px;
  bottom: -200px;
  left: -150px;
  background: radial-gradient(circle, rgba(254, 147, 199, 0.15) 0%, transparent 70%);
  opacity: 0.6;
  animation-direction: reverse;
  animation-duration: 25s;
}

.auth-page__container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1100px;
  min-height: 580px;
  background: var(--paper);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  animation: slideUp 0.5s var(--ease-out);
}

.auth-page__left {
  position: relative;
  background: url('/bg.jpg') center / cover no-repeat;
  display: flex;
  align-items: flex-end;
}

.auth-page__left-inner {
  position: relative;
  z-index: 1;
  padding: var(--sp-6);
  width: 100%;
}

.auth-page__right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--sp-8) var(--sp-6);
}

/* Responsive: tablet */
@media (max-width: 1024px) and (min-width: 768px) {
  .auth-page__container {
    grid-template-columns: 1fr;
    max-width: 500px;
  }

  .auth-page__left {
    display: none;
  }
}

/* Responsive: mobile */
@media (max-width: 767px) {
  .auth-page {
    padding: var(--sp-3);
    background: url('/bg.jpg') center / cover no-repeat fixed;
  }

  .auth-page__container {
    grid-template-columns: 1fr;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    max-width: 420px;
    min-height: auto;
  }

  .auth-page__left {
    display: none;
  }

  .auth-page__right {
    padding: var(--sp-6) var(--sp-5);
  }

  .auth-page__halo {
    display: none;
  }
}

@media (prefers-color-scheme: dark) {
  @media (max-width: 767px) {
    .auth-page__container {
      background: rgba(17, 22, 42, 0.92);
    }
  }
}
</style>
