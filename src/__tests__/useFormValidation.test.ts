import { describe, it, expect } from 'vitest'
import { useFormValidation } from '@/composables/useFormValidation'
import { loginSchema } from '@/utils/validators'

describe('useFormValidation', () => {
  it('returns no errors for valid data', () => {
    const { validateAll, errors } = useFormValidation(loginSchema)
    const valid = validateAll({ username: 'testuser', password: '12345678' })
    expect(valid).toBe(true)
    expect(errors.value).toEqual({})
  })

  it('returns field errors for invalid data', () => {
    const { validateAll, errors } = useFormValidation(loginSchema)
    const valid = validateAll({ username: '', password: '' })
    expect(valid).toBe(false)
    expect(errors.value.username).toBeDefined()
    expect(errors.value.password).toBeDefined()
  })

  it('validates single field in eager mode', () => {
    const { validateAll, validateField, errors } = useFormValidation(loginSchema)
    validateAll({ username: '', password: '' })
    validateField('username', 'validuser')
    expect(errors.value.username).toBeUndefined()
  })

  it('does not validate field before first submit', () => {
    const { validateField, errors } = useFormValidation(loginSchema)
    validateField('username', '')
    expect(errors.value.username).toBeUndefined()
  })

  it('setFieldError sets a custom error', () => {
    const { setFieldError, errors } = useFormValidation(loginSchema)
    setFieldError('username', '该账号已存在')
    expect(errors.value.username).toBe('该账号已存在')
  })

  it('clearErrors resets state', () => {
    const { validateAll, clearErrors, errors, hasSubmitted } = useFormValidation(loginSchema)
    validateAll({ username: '', password: '' })
    clearErrors()
    expect(errors.value).toEqual({})
    expect(hasSubmitted.value).toBe(false)
  })
})
