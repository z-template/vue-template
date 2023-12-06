import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import SvgIcon from './components/SvgIcon/index'

import 'virtual:svg-icons-register'
import 'vant/lib/index.css'
import './styles/index.less'
import 'virtual:uno.css'

const app = createApp(App)
const intervalMS = 60 * 60 * 1000

useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update()
      }, intervalMS)
  }
})

setupRouter(app)
setupStore(app)
app.component('SvgIcon', SvgIcon)

app.mount('#app')
