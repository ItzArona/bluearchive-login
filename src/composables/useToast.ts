import { ref } from 'vue'

export interface ToastItem {
  id: number
  title: string
  message?: string
  type: 'success' | 'error' | 'info'
}

const toasts = ref<ToastItem[]>([])
let nextId = 0

export function useToast() {
  function show(title: string, message?: string, type: ToastItem['type'] = 'info') {
    const id = nextId++
    toasts.value.push({ id, title, message, type })
    return id
  }

  function success(title: string, message?: string) {
    return show(title, message, 'success')
  }

  function error(title: string, message?: string) {
    return show(title, message, 'error')
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return { toasts, show, success, error, dismiss }
}
