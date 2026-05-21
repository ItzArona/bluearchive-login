import { ref, type Ref } from 'vue'
import type { ZodObject, ZodRawShape } from 'zod'

export type FieldErrors = Record<string, string | undefined>

export function useFormValidation<T extends ZodRawShape>(schema: ZodObject<T>) {
  const errors: Ref<FieldErrors> = ref({})
  const hasSubmitted = ref(false)

  function validateAll(data: Record<string, unknown>): boolean {
    hasSubmitted.value = true
    const result = schema.safeParse(data)
    if (result.success) {
      errors.value = {}
      return true
    }
    const fieldErrors: FieldErrors = {}
    for (const issue of result.error.issues) {
      const field = String(issue.path[0])
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }
    errors.value = fieldErrors
    return false
  }

  function validateField(field: string, value: unknown): void {
    if (!hasSubmitted.value) return
    const fieldSchema = schema.shape[field]
    if (!fieldSchema) return
    const result = fieldSchema.safeParse(value)
    if (result.success) {
      errors.value = { ...errors.value, [field]: undefined }
    } else {
      errors.value = { ...errors.value, [field]: result.error.issues[0]?.message }
    }
  }

  function setFieldError(field: string, message: string): void {
    errors.value = { ...errors.value, [field]: message }
  }

  function clearErrors(): void {
    errors.value = {}
    hasSubmitted.value = false
  }

  return { errors, hasSubmitted, validateAll, validateField, setFieldError, clearErrors }
}
