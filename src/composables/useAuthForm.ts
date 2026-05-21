import { ref, computed } from 'vue'
import { useFormValidation } from './useFormValidation'
import { loginSchema, registerSchema } from '@/utils/validators'
import { sha256 } from '@/utils/crypto'
import * as authApi from '@/api/auth'
import { useSessionStore } from '@/stores/session'
import { useToast } from './useToast'
import { useRememberedUser } from './useRememberedUser'
import type { AuthResponse } from '@/types/api'

export function useAuthForm() {
  const isLogin = ref(true)

  const username = ref('')
  const password = ref('')
  const email = ref('')
  const code = ref('')
  const agreeTerms = ref(false)
  const rememberUser = ref(false)
  const loading = ref(false)

  const loginValidation = useFormValidation(loginSchema)
  const registerValidation = useFormValidation(registerSchema)

  const errors = computed(() =>
    isLogin.value ? loginValidation.errors.value : registerValidation.errors.value,
  )

  const { save, load } = useRememberedUser()
  const session = useSessionStore()
  const toast = useToast()

  function initFromStorage() {
    const saved = load()
    if (saved) {
      username.value = saved
      rememberUser.value = true
    }
  }

  function toggleMode() {
    isLogin.value = !isLogin.value
    loginValidation.clearErrors()
    registerValidation.clearErrors()
  }

  function validateField(field: string, value: unknown) {
    if (isLogin.value) {
      loginValidation.validateField(field, value)
    } else {
      registerValidation.validateField(field, value)
    }
  }

  async function submit() {
    const data = isLogin.value
      ? { username: username.value, password: password.value }
      : {
          username: username.value,
          password: password.value,
          email: email.value,
          code: code.value,
          agreeTerms: agreeTerms.value,
        }

    const valid = isLogin.value
      ? loginValidation.validateAll(data)
      : registerValidation.validateAll(data)

    if (!valid) return

    loading.value = true
    try {
      const passwordHash = await sha256(password.value)

      let res: AuthResponse
      if (isLogin.value) {
        res = await authApi.login({ username: username.value, password_hash: passwordHash })
      } else {
        res = await authApi.register({
          username: username.value,
          password_hash: passwordHash,
          email: email.value,
          code: code.value,
          agree_terms: true,
        })
      }

      if (res.ok) {
        session.setSession(res.token, res.user, res.expires_in)

        if (rememberUser.value) {
          save(username.value)
        }

        toast.success(isLogin.value ? '登录成功' : '注册成功')

        const redirect = res.redirect_url || import.meta.env.VITE_AFTER_LOGIN_URL || '/'
        const ticket = res.handoff_ticket
        setTimeout(() => {
          window.location.href = `${redirect}${redirect.includes('?') ? '&' : '?'}ticket=${ticket}`
        }, 1000)
      } else {
        toast.error(res.message)
        if (res.field) {
          if (isLogin.value) {
            loginValidation.setFieldError(res.field, res.message)
          } else {
            registerValidation.setFieldError(res.field, res.message)
          }
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '请稍后重试'
      toast.error(msg)
    } finally {
      loading.value = false
    }
  }

  return {
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
  }
}
