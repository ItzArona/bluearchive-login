import { describe, it, expect, beforeEach } from 'vitest'
import { getItem, setItem, removeItem } from '@/utils/storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('stores and retrieves a value', () => {
    setItem('test_key', { hello: 'world' })
    expect(getItem('test_key')).toEqual({ hello: 'world' })
  })

  it('returns null for missing key', () => {
    expect(getItem('nonexistent')).toBeNull()
  })

  it('removes a value', () => {
    setItem('test_key', 'value')
    removeItem('test_key')
    expect(getItem('test_key')).toBeNull()
  })

  it('uses ba_login. prefix in localStorage', () => {
    setItem('foo', 'bar')
    expect(localStorage.getItem('ba_login.foo')).toBe('"bar"')
  })
})
