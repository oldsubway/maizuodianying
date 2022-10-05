import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入vant组件
import './utils/vant.js'
// 导入全局样式文件
import '@/assets/css/main.less'
// 导入day.js并设置语言为中文
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
Vue.config.productionTip = false
dayjs.locale('zh-cn')
// 将dayjs放到vue原型上
Vue.prototype.dayjs = dayjs
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
