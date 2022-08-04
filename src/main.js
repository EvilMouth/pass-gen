import Vue from 'vue'
import App from './App.vue'
import { Button, Slider, CheckboxGroup, Checkbox, Input } from 'element-ui'
import router from './router'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Slider)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Input)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
