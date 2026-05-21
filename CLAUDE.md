# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

蔚蓝档案（BlueArchive）主题的登录/注册页面 — a static, single-page frontend made of three files (`index.html`, `style.css`, `script.js`) plus `bg.jpg`. There is no build system, package manager, or test suite. To preview, open `index.html` directly in a browser, or serve the directory with any static server (e.g. `python -m http.server`).

## Architecture

The whole app is a single HTML page that toggles between two modes (登录 / 注册) inside one `<form id="authForm">`. Several concepts run on top of this single form and are only loosely separated:

- **Form-mode toggle** (`script.js:32-80`): Clicking `#toggleForm` runs an opacity/transform exit animation (~300ms), then `toggleFormContent()` flips `isLoginForm`, swaps title/button text, shows/hides the email + verification-code + terms-agreement groups, and re-runs `initializeFormHandling()`. The email / code / terms inputs live in the same form but are toggled via inline `display` styles — they are not separate forms.

- **Submit handler reattachment** (`script.js:295-363`): `handleSubmit` is stored in a module-level `let` so that each `toggleFormContent()` can remove the previous listener and add a new one. This is intentional — the closure captures the current `isLoginForm` value. If you refactor, preserve the remove-then-add pattern or the listener will be bound to a stale mode.

- **Submit target**: `fetch(window.location.href, { method: 'POST', body: formData })` posts back to whatever URL serves the page. On `data.success` it redirects to `/user.php`. The frontend is designed to be dropped into a PHP (or any server-side) host that handles `action=login` / `action=register` form fields. Do not assume a specific backend exists in this repo — there isn't one.

- **Verification-code countdown** (`script.js:82-148`): A 60-second countdown is persisted in `localStorage.codeCountdown` as an absolute end-timestamp, so the cooldown survives page reloads. The page-load handler at line 128 rehydrates the timer. Two independent `setInterval`s exist (click-time and load-time) — keep them in sync if you change the duration or storage key.

- **Theming** (`script.js:175-252`): Color choices are stored in `localStorage.themeColor`. `applyThemeColor()` sets `--theme-color` on `:root` AND appends a fresh `<style>` element each call with `!important` overrides for buttons/links. Repeated theme changes append more `<style>` tags — be aware that style sheets accumulate; the latest one wins by cascade order. Some selectors in `style.css` use `var(--theme-color)` directly while others are overridden by the injected `<style>`. Both paths must be updated when adding theme-aware elements.

- **Dark mode**: Toggled via `body.dark-mode` class, persisted in `localStorage.darkMode`. All dark-mode rules live in `style.css` under `.dark-mode ...` selectors.

- **Responsive layout** (`script.js:17-30`, `style.css:103-126`): Below 768px, JS hides `.left-side` and copies its background-image to `body`. The `@media (max-width: 767px)` block in CSS does the same thing declaratively. Both mechanisms are active simultaneously — changes to the breakpoint must be made in both places.

- **Custom alerts** (`script.js:371-425`): `showAlert(title, message, type)` appends to `#alertContainer` with stacked transitions. Hover pauses the auto-dismiss timer.

- **localStorage keys** used across the app: `codeCountdown`, `themeColor`, `darkMode`, `rememberedUsername`, `rememberedPassword`, `rememberMe`. Note that password is stored in plaintext when "记住我" is checked — flag this if the user is hardening the page.

## Notes for editing

- All UI text is Chinese. Keep new copy consistent with the existing tone (e.g. quote-box text on the left panel).
- The repo has no linter or formatter configured. Match the existing style: 4-space indent in JS/CSS/HTML, double quotes in HTML, single quotes in JS.
- README screenshots are hosted on `blog.xiaoy.asia` — do not try to fetch or modify them.
