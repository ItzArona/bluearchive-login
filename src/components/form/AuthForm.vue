<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TextField from '@/components/form/TextField.vue'
import CodeField from '@/components/form/CodeField.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import SubmitButton from '@/components/form/SubmitButton.vue'
import { useAuthForm } from '@/composables/useAuthForm'
import { useCodeCountdown } from '@/composables/useCodeCountdown'
import { useToast } from '@/composables/useToast'
import * as authApi from '@/api/auth'

const {
  isLogin,
  username,
  password,
  email,
  code,
  agreeTerms,
  rememberUser,
  loading,
  errors,
  initFromStorage,
  toggleMode,
  validateField,
  submit,
} = useAuthForm()

const { remaining, isCounting, start: startCountdown } = useCodeCountdown(() => email.value)
const toast = useToast()

const animating = ref(false)

onMounted(initFromStorage)

function onToggleMode() {
  animating.value = true
  setTimeout(() => {
    toggleMode()
    setTimeout(() => {
      animating.value = false
    }, 400)
  }, 300)
}

async function onRequestCode() {
  if (!email.value) return
  try {
    const res = await authApi.requestCode({ email: email.value, purpose: 'register' })
    if (res.ok) {
      startCountdown()
      toast.success('验证码已发送', '请在 5 分钟内完成验证')
    } else {
      toast.error(res.message)
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : '发送失败'
    toast.error(msg)
  }
}

function onSubmit(e: Event) {
  e.preventDefault()
  submit()
}
</script>

<template>
  <div class="auth-form" :class="{ 'auth-form--out': animating }">
    <h1 class="auth-form__title">
      <span class="auth-form__title-bar" />
      {{ isLogin ? '登录' : '注册' }}
    </h1>

    <form @submit="onSubmit" novalidate>
      <TextField
        v-model="username"
        label="账号"
        name="username"
        autocomplete="username"
        :error="errors.username"
        @blur="() => validateField('username', username)"
      />

      <TextField
        v-model="password"
        label="密码"
        name="password"
        type="password"
        :autocomplete="isLogin ? 'current-password' : 'new-password'"
        :error="errors.password"
        @blur="() => validateField('password', password)"
      />

      <template v-if="!isLogin">
        <TextField
          v-model="email"
          label="邮箱"
          name="email"
          type="email"
          autocomplete="email"
          :error="errors.email"
          @blur="() => validateField('email', email)"
        />

        <CodeField
          v-model="code"
          :email="email"
          :error="errors.code"
          :is-counting="isCounting"
          :remaining="remaining"
          @blur="() => validateField('code', code)"
          @request-code="onRequestCode"
        />

        <Checkbox
          v-model="agreeTerms"
          name="agreeTerms"
          label="我已阅读并同意服务条款"
          :error="errors.agreeTerms"
        >
          我已阅读并同意
          <a href="https://docs.xiaoy.asia/" target="_blank" rel="noopener noreferrer">服务条款</a>
          和
          <a href="https://docs.xiaoy.asia/" target="_blank" rel="noopener noreferrer">隐私政策</a>
        </Checkbox>
      </template>

      <Checkbox
        v-if="isLogin"
        v-model="rememberUser"
        name="rememberUser"
        label="记住账号"
      />

      <SubmitButton :loading="loading">
        {{ isLogin ? '登录' : '注册' }}
      </SubmitButton>
    </form>

    <button type="button" class="auth-form__toggle" @click="onToggleMode">
      {{ isLogin ? '没有账号？注册' : '已有账号？登录' }}
    </button>
  </div>
</template>

<style scoped>
.auth-form {
  width: 100%;
  max-width: 380px;
  animation: scaleIn 0.4s var(--ease-out);
}

.auth-form--out {
  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.3s var(--ease-out);
}

.auth-form__title {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  font-size: var(--fs-2xl);
  font-weight: 700;
  color: var(--ink-900);
  margin-bottom: var(--sp-6);
}

.auth-form__title-bar {
  display: block;
  width: 4px;
  height: 28px;
  border-radius: var(--r-pill);
  background: var(--ba-yellow);
}

.auth-form__toggle {
  display: block;
  width: 100%;
  margin-top: var(--sp-4);
  padding: var(--sp-2);
  border: none;
  background: transparent;
  color: var(--ba-blue-500);
  font-size: var(--fs-sm);
  cursor: pointer;
  text-align: center;
  transition: color 0.2s;
}

.auth-form__toggle:hover {
  text-decoration: underline;
}
</style>
