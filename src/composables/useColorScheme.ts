import { ref, onMounted, onUnmounted } from 'vue'

export function useColorScheme() {
  const isDark = ref(false)

  let mql: MediaQueryList | null = null

  function update(e: MediaQueryListEvent | MediaQueryList) {
    isDark.value = e.matches
  }

  onMounted(() => {
    mql = window.matchMedia('(prefers-color-scheme: dark)')
    isDark.value = mql.matches
    mql.addEventListener('change', update)
  })

  onUnmounted(() => {
    mql?.removeEventListener('change', update)
  })

  return { isDark }
}
