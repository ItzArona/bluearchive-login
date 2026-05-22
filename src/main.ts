import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/tokens.css'
import './styles/base.css'
import './styles/scheme.css'
import './styles/animations.css'

const pendingRedirect = sessionStorage.getItem('pendingRedirect')
if (pendingRedirect) {
  sessionStorage.removeItem('pendingRedirect')
  window.location.href = pendingRedirect
} else {
  const app = createApp(App)
  app.use(createPinia())
  app.mount('#app')
}
