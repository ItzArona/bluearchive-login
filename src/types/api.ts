export interface User {
  id: string
  username: string
  nickname?: string
}

export interface LoginRequest {
  username: string
  password_hash: string
}

export interface RegisterRequest {
  username: string
  password_hash: string
  email: string
  code: string
  agree_terms: true
}

export interface CodeRequest {
  email: string
  purpose: 'register'
}

export type AuthSuccessResponse = {
  ok: true
  token: string
  expires_in: number
  user: User
  redirect_url?: string
  handoff_ticket: string
}

export type AuthErrorResponse = {
  ok: false
  code: string
  message: string
  field?: 'username' | 'password' | 'email' | 'code'
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse

export type CodeSuccessResponse = { ok: true }

export type CodeErrorResponse = {
  ok: false
  code: 'INVALID_EMAIL' | 'TOO_FREQUENT' | 'EMAIL_TAKEN'
  message: string
}

export type CodeResponse = CodeSuccessResponse | CodeErrorResponse

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
