import { describe, it, expect } from 'vitest'
import { sha256 } from '@/utils/crypto'

describe('sha256', () => {
  it('hashes empty string correctly', async () => {
    const hash = await sha256('')
    expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
  })

  it('hashes a known value', async () => {
    const hash = await sha256('hello')
    expect(hash).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
  })

  it('produces 64-char hex string', async () => {
    const hash = await sha256('test')
    expect(hash).toHaveLength(64)
    expect(/^[0-9a-f]+$/.test(hash)).toBe(true)
  })
})
