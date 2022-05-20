import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App)

// todo need to add this error
// app.config.errorHandler((error) => console.error(error as Error), null, 'hippo-web-app')

app.use(store).use(router).mount('#app')
