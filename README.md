<h1 align="center">BlueArchive Login</h1>
<p align="center">蔚蓝档案（Blue Archive）风格的登录 / 注册前端</p>
<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-42b883?logo=vue.js" alt="Vue 3">
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-8-646cff?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/License-AGPL--3.0-blue" alt="License">
</p>

---

## 特性

- **深度 BA 风视觉** — Halo 光晕背景、斜切几何线、3D 高光按钮、黄色竖条标题
- **Vue 3 + TypeScript** — Composition API、`<script setup>`、strict 类型
- **对接独立 REST JSON API** — 登录 / 注册 / 验证码三端点，token 存内存 + 一次性 ticket 跳转
- **安全优先** — 前端 SHA-256 hash 密码（后端仍需 bcrypt/argon2 二次哈希存储）、"记住账号"仅存用户名、不持久化 token
- **Zod 校验** — lazy → eager 策略，后端字段错误映射到具体输入框
- **暗色模式** — 随系统 `prefers-color-scheme`，无需手动切换
- **响应式三档** — 桌面双栏 / 平板单栏 / 移动端半透明卡片
- **无障碍** — `label` + `autocomplete` + `aria-describedby`、密码显示切换、`prefers-reduced-motion`
- **21 个单测** — vitest 覆盖 validators / storage / crypto / formValidation

## 快速开始

```bash
# 克隆
git clone https://github.com/ItzArona/bluearchive-login.git
cd bluearchive-login

# 安装依赖
npm install

# 配置环境变量（按需修改）
cp .env.example .env

# 启动开发服务器
npm run dev
```

打开 `http://localhost:5173` 即可预览。

## 构建

```bash
npm run build    # 输出到 dist/
npm run preview  # 本地预览生产构建
```

## 测试

```bash
npx vitest run   # 运行全部单测
npx vue-tsc --noEmit  # 类型检查
```

## 环境变量

| 变量 | 说明 | 默认值 |
|---|---|---|
| `VITE_API_BASE` | 后端 API 基础路径 | `/api` |
| `VITE_AFTER_LOGIN_URL` | 登录成功后跳转地址 | `/` |

## 技术栈

| 层 | 选择 |
|---|---|
| 框架 | Vue 3 + Composition API |
| 构建 | Vite 8 |
| 语言 | TypeScript (strict) |
| 状态 | Pinia |
| 校验 | Zod |
| 图标 | 内联 SVG (icons.svg) |
| 字体 | Noto Sans SC |
| 测试 | Vitest |
| CSS | 手写 + CSS 变量 tokens |

## 项目结构

```
src/
├─ api/          # fetch 封装 + auth 端点
├─ composables/  # useAuthForm / useFormValidation / useCodeCountdown / useToast ...
├─ components/   # TextField / CodeField / Checkbox / SubmitButton / Toast / QuoteBox ...
├─ pages/        # AuthPage（双栏 + Halo + 响应式）
├─ stores/       # session（token 内存存储）
├─ styles/       # tokens / base / scheme / animations
├─ types/        # API 请求 / 响应类型
└─ utils/        # validators / storage / crypto
```

## API 契约

本前端预期后端提供以下 JSON 端点：

- `POST /api/auth/login` — 登录
- `POST /api/auth/register` — 注册（成功自动登录）
- `POST /api/auth/code` — 发送邮箱验证码
- `GET /api/auth/exchange?ticket=xxx` — 外部页面用一次性 ticket 换 session

详见上方 API 端点说明。

## 许可证

本项目基于 [GNU Affero General Public License v3.0](LICENSE) 开源。
