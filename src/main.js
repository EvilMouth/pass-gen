import Vue from 'vue'
import App from './App.vue'
import { Button, Slider, CheckboxGroup, Checkbox } from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Slider)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)

new Vue({
  render: h => h(App)
}).$mount('#app')
