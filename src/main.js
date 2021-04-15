// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
 import md5 from 'js-md5'
import JsEncrypt from 'jsencrypt' // 采用RSA加密的方式

 Vue.prototype.$md5 = md5
Vue.prototype.$qs = qs
Vue.config.productionTip = false


Vue.prototype.$encruption = function (obj) {
  let encrypt = new JsEncrypt()
  // 公钥
  encrypt.setPublicKey(
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClfSV6XAifPlyUcpXrI8yN2VFZT8DSvjIPhplgF2n9ZnaiH293WdZxwKQaj8WMhU6bL+/HeO0j4MmQ2x0WTafN4bl9SVWgKYS/BMk/4Tkfhv3mtFGvm05D/mYaRBoH/hIVMRjSID04qs2ceUFpQtjUncVHrWve92g+g0foAURghwIDAQAB'
  )
  return encrypt.encrypt(obj)
}

/* eslint-disable no-new */
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
