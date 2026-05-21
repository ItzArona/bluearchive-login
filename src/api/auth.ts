import { http } from './http'
import type {
  LoginRequest,
  RegisterRequest,
  CodeRequest,
  AuthResponse,
  CodeResponse,
} from '@/types/api'

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
