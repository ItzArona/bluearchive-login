import { ApiError } from '@/types/api'
import { useSessionStore } from '@/stores/session'

const getBaseUrl = (): string => import.meta.env.VITE_API_BASE || '/api'

export async function http<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${getBaseUrl()}${endpoint}`

  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const session = useSessionStore()
  if (session.token) {
    headers.set('Authorization', `Bearer ${session.token}`)
  }

  const res = await fetch(url, { ...options, headers, credentials: 'include' })

  if (res.status === 401) {
    session.clear()
    throw new ApiError('UNAUTHORIZED', '登录已过期', 401)
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new ApiError('HTTP_ERROR', text || `请求失败 (${res.status})`, res.status)
  }

  return res.json() as Promise<T>
}
