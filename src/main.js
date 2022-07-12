import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import toast from '@/components/common/toast'
import VueLazyLoad from 'vue-lazyload'
const loadimage = require('@/assets/img/common/loading.gif')
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VueLazyLoad, {
        preLoad: 1.3,
        loading: loadimage
    })
    /* eslint-disable no-new */
new Vue({
    // el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')