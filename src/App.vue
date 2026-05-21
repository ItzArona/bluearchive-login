<script setup lang="ts">
import AuthPage from '@/pages/AuthPage.vue'
import ToastHost from '@/components/feedback/ToastHost.vue'
import LoadingOverlay from '@/components/feedback/LoadingOverlay.vue'
</script>

<template>
  <LoadingOverlay />
  <AuthPage />
  <ToastHost />
</template>
