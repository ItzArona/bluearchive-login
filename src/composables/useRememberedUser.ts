import { getItem, setItem, removeItem } from '@/utils/storage'

const KEY = 'remembered_username'

export function useRememberedUser() {
  function load(): string | null {
    return getItem<string>(KEY)
  }

  function save(username: string) {
    setItem(KEY, username)
  }

  function clear() {
    removeItem(KEY)
  }

  return { load, save, clear }
}
