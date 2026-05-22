import { http } from './http'
import type {
  LoginRequest,
  RegisterRequest,
  CodeRequest,
  AuthResponse,
  CodeResponse,
} from '@/types/api'

// password_hash 是客户端 SHA-256 预哈希，后端必须使用 bcrypt/argon2 二次哈希后再存储

export function login(payload: LoginRequest): Promise<AuthResponse> {
  return http<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function register(payload: RegisterRequest): Promise<AuthResponse> {
  return http<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function requestCode(payload: CodeRequest): Promise<CodeResponse> {
  return http<CodeResponse>('/auth/code', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
