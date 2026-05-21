import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '@/utils/validators'

describe('loginSchema', () => {
  it('passes valid login input', () => {
    const result = loginSchema.safeParse({ username: 'testuser', password: '12345678' })
    expect(result.success).toBe(true)
  })

  it('rejects short username', () => {
    const result = loginSchema.safeParse({ username: 'ab', password: '12345678' })
    expect(result.success).toBe(false)
  })

  it('rejects short password', () => {
    const result = loginSchema.safeParse({ username: 'testuser', password: '1234567' })
    expect(result.success).toBe(false)
  })

  it('rejects username with special chars', () => {
    const result = loginSchema.safeParse({ username: 'test@user', password: '12345678' })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  it('passes valid register input', () => {
    const result = registerSchema.safeParse({
      username: 'newuser',
      password: 'securepass',
      email: 'test@example.com',
      code: '123456',
      agreeTerms: true,
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = registerSchema.safeParse({
      username: 'newuser',
      password: 'securepass',
      email: 'notanemail',
      code: '123456',
      agreeTerms: true,
    })
    expect(result.success).toBe(false)
  })

  it('rejects non-6-digit code', () => {
    const result = registerSchema.safeParse({
      username: 'newuser',
      password: 'securepass',
      email: 'test@example.com',
      code: '12345',
      agreeTerms: true,
    })
    expect(result.success).toBe(false)
  })

  it('rejects agreeTerms false', () => {
    const result = registerSchema.safeParse({
      username: 'newuser',
      password: 'securepass',
      email: 'test@example.com',
      code: '123456',
      agreeTerms: false,
    })
    expect(result.success).toBe(false)
  })
})
