import Vue from 'vue'
import App from './App'

import API from '@/api/api.js'
import Filter from '@/utils/filter.js'
import Global from '@/utils/global.js'

Vue.prototype.$api = API
Vue.prototype.$filter = Filter
Vue.prototype.$global = Global

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
