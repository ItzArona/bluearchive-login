import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/api'

export const useSessionStore = defineStore('session', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const expiresAt = ref<number>(0)

  function setSession(t: string, u: User, ttl: number) {
    token.value = t
    user.value = u
    expiresAt.value = Date.now() + ttl * 1000
  }

  function clear() {
    token.value = null
    user.value = null
    expiresAt.value = 0
  }

  function isValid(): boolean {
    return !!token.value && Date.now() < expiresAt.value
  }

  return { token, user, expiresAt, setSession, clear, isValid }
})
