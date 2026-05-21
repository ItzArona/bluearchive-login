import { ref, onMounted, onUnmounted } from 'vue'
import { getItem, setItem, removeItem } from '@/utils/storage'

export function useCodeCountdown(email: () => string) {
  const remaining = ref(0)
  const isCounting = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  function storageKey() {
    return `code_countdown.${email()}`
  }

  function start(duration = 60) {
    const endTime = Date.now() + duration * 1000
    setItem(storageKey(), endTime)
    tick(endTime)
  }

  function tick(endTime: number) {
    isCounting.value = true
    remaining.value = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))

    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      const left = Math.ceil((endTime - Date.now()) / 1000)
      if (left <= 0) {
        stop()
      } else {
        remaining.value = left
      }
    }, 1000)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    remaining.value = 0
    isCounting.value = false
    removeItem(storageKey())
  }

  function restore() {
    const saved = getItem<number>(storageKey())
    if (saved && saved > Date.now()) {
      tick(saved)
    }
  }

  onMounted(restore)
  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { remaining, isCounting, start, stop, restore }
}
