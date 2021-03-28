import {
    createApp
} from 'vue'
import App from './App.vue'
// import bootstrap css
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
// import custom css style
import "./assets/css/style.css";
// import Vue Router
import router from './router'
// import states
import vuexStore from './store/index'


let mainApp = createApp(App)
mainApp.use(router)
mainApp.use(vuexStore)
mainApp.mount('#app')