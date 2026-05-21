import { z } from 'zod'

export const usernameSchema = z.string()
  .min(3, '账号至少 3 个字符')
  .max(20, '账号最多 20 个字符')
  .regex(/^[a-zA-Z0-9_]+$/, '只能包含字母、数字、下划线')

export const passwordSchema = z.string()
  .min(8, '密码至少 8 位')
  .max(64, '密码最多 64 位')

export const emailSchema = z.string().email('邮箱格式不正确')

export const codeSchema = z.string().regex(/^\d{6}$/, '验证码为 6 位数字')

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
})

export const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
  code: codeSchema,
  agreeTerms: z.literal(true, { message: '请先同意服务条款' }),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
