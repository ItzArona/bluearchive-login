<script setup lang="ts">
import { onMounted, computed } from 'vue'
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

const modeLabel = computed(() => isLogin.value ? '登录' : '注册')
const toggleLabel = computed(() => isLogin.value ? '没有账号？立即注册' : '已有账号？返回登录')

onMounted(initFromStorage)

function onToggleMode() {
  toggleMode()
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
  <div class="auth-form-wrapper">
    <div class="auth-form">
      <!-- Title: crossfade text -->
      <h1 class="auth-form__title">
        <Transition name="title-fade" mode="out-in">
          <span :key="modeLabel" class="auth-form__title-text">{{ modeLabel }}</span>
        </Transition>
        <span class="auth-form__title-line" />
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

        <!-- Register fields: smooth grid expand/collapse -->
        <div class="auth-form__expandable" :class="{ expanded: !isLogin }">
          <div class="auth-form__expandable-inner">
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
          </div>
        </div>

        <!-- Remember me: smooth grid expand/collapse -->
        <div class="auth-form__expandable" :class="{ expanded: isLogin }">
          <div class="auth-form__expandable-inner">
            <Checkbox
              v-model="rememberUser"
              name="rememberUser"
              label="记住账号"
            />
          </div>
        </div>

        <SubmitButton :loading="loading">
          {{ modeLabel }}
        </SubmitButton>
      </form>

      <button type="button" class="auth-form__toggle" @click="onToggleMode">
        {{ toggleLabel }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.auth-form-wrapper {
  width: 100%;
  max-width: 360px;
}

.auth-form {
  width: 100%;
  animation: formEnter 0.5s 0.3s var(--ease-out) both;
}

@keyframes formEnter {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Title with crossfade */
.auth-form__title {
  position: relative;
  margin-bottom: var(--sp-6);
  padding-bottom: var(--sp-3);
}

.auth-form__title-text {
  display: inline-block;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--ink-900);
  letter-spacing: -0.5px;
}

.auth-form__title-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 48px;
  height: 3px;
  border-radius: var(--r-pill);
  background: linear-gradient(90deg, var(--ba-blue-500), var(--ba-yellow));
}

.title-fade-enter-active,
.title-fade-leave-active {
  transition: all 0.25s var(--ease-out);
}

.title-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.title-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Expandable sections using grid rows */
.auth-form__expandable {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s var(--ease-out);
}

.auth-form__expandable.expanded {
  grid-template-rows: 1fr;
}

.auth-form__expandable-inner {
  overflow: hidden;
  min-height: 0;
}

/* Toggle button */
.auth-form__toggle {
  display: block;
  width: 100%;
  margin-top: var(--sp-5);
  padding: var(--sp-3);
  border: none;
  background: transparent;
  color: var(--ink-500);
  font-size: var(--fs-sm);
  cursor: pointer;
  text-align: center;
  transition: color 0.25s;
  position: relative;
}

.auth-form__toggle::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 1px;
  background: var(--ba-blue-500);
  transition: all 0.3s var(--ease-out);
  transform: translateX(-50%);
}

.auth-form__toggle:hover {
  color: var(--ba-blue-500);
}

.auth-form__toggle:hover::after {
  width: 60%;
}
</style>
