<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="tabIndex" route v-show="$route.meta.tabbarShow">
      <van-tabbar-item to="/films" icon-prefix="iconfont" icon="dianying">电影</van-tabbar-item>
      <van-tabbar-item to="/cinemas" icon-prefix="iconfont" icon="dianyingyuan">影院</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getAddress } from '@/utils/getAddress.js'
import { Dialog, Toast } from 'vant'
export default {
  name: 'App',
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    async getLocalCity() {
      const res = await getAddress()
      if (res.status === 0) {
        const { ad_info: data } = res.result
        Dialog.confirm({
          message: '用户当前所在城市为' + data.city
        })
          .then(() => {
            localStorage.setItem('cityId', data.adcode)
            localStorage.setItem('cityName', data.city)
          })
          .catch(() => {
            localStorage.setItem('cityId', 110100)
            localStorage.setItem('cityName', '北京')
          })
      } else {
        Toast('获取位置失败')
      }
    }
  },
  created() {
    !localStorage.getItem('cityId') && this.getLocalCity()
  }
}
</script>

<style lang="less" scoped></style>
