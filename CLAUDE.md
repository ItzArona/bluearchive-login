# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

蔚蓝档案（BlueArchive）主题的登录/注册页面，当前为一个基于 **Vue + Vite + TypeScript** 的前端项目，并带有 **Vitest** 测试支持。不要再把这个仓库当作只有 `index.html`、`style.css`、`script.js` 的静态三文件页面；旧的静态实现说明如果仍需保留，应视为历史资料并迁移到 `_legacy/` 下以免误导贡献者。

使用仓库中定义的 package-manager scripts 进行本地开发、构建与测试，而不是直接打开 `index.html`。如需查看准确命令，请以 `package.json` 中的 scripts 为准。

## Architecture

该项目现在采用组件化前端架构：

- **Vue application**: UI 由 Vue 组件构成，而不是单个 HTML 页面上的手写 DOM 操作。修改界面行为时，优先在组件状态、事件处理和模板结构中查找实现。
- **Vite toolchain**: 本地开发、生产构建和静态资源处理由 Vite 管理。不要添加依赖于“直接打开 HTML 文件”的工作流说明。
- **TypeScript codebase**: 新增或修改逻辑时应保持类型信息完整，优先复用已有类型、props、emits、composables 和工具函数定义。
- **Vitest coverage**: 仓库现在有测试能力。修改交互逻辑、状态变更或工具函数时，应同步更新或新增 Vitest 测试。

## Notes for editing

- All UI text is Chinese. Keep new copy consistent with the existing tone.
- Prefer project conventions already established in the Vue/TypeScript code over legacy plain-JS patterns.
- When documenting workflows, reference the Vite/package-manager workflow and test scripts rather than static-file preview instructions.
- README screenshots are hosted on `blog.xiaoy.asia` — do not try to fetch or modify them.
