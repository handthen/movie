import App from './App'

import NavBar from "@/components/NavBar/NavBar.vue"
import ImageLoad from "@/components/ImageLoad/ImageLoad.vue"
import Loading from "@/components/loading/loading.vue"
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	createPinia
} from "pinia"
import cloudFunc from "@/uilts/cloudFunc.js"

export function createApp() {
	const app = createSSRApp(App)
	app.use(createPinia())
	app.component("NavBar",NavBar)
	app.component("ImageLoad",ImageLoad)
	app.component("Loading",Loading)
	uni.$cloud = cloudFunc
	return {
		app
	}
}
// #endif
