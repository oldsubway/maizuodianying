<template lang="">
  <div ref="list">
    <van-nav-bar v-show="showTop" fixed :border="false" title="影院" :left-text="cityName + '▼'" @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active" :sticky="showTop" offset-top="46" title-active-color="#1989fa" color="#1989fa" lazy-render class="contain" @click="changeTab">
      <van-tab title="正在热映" to="/films/nowPlaying"> <router-view v-if="active === 0"></router-view> </van-tab>
      <van-tab title="即将上映" to="/films/commingSoon"><router-view v-if="active === 1"></router-view> </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: 'FilmTab',
  data() {
    return {
      active: 0,
      showTop: false,
      scrollHeight: 0,
      cityName: '北京',
      count: 1,
      scrollTimeout: null
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/city')
    },

    scrollThrottler() {
      const that = this
      if (!that.scrollTimeout) {
        this.scrollTimeout = setTimeout(function () {
          that.scrollTimeout = null
          that.scrollHandler()
        }, 200)
      }
    },

    scrollHandler() {
      if (window.scrollY > 300) {
        this.showTop = true
      } else {
        this.showTop = false
      }
    },

    changeTab() {
      this.showTop = false
    }
  },

  watch: {
    $route: {
      handler() {
        this.active = this.$route.meta.active
      },
      immediate: true
    }
  },

  created() {
    this.cityName = localStorage.getItem('cityName') || '北京'
  },
  mounted() {
    window.addEventListener('scroll', this.scrollThrottler)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollThrottler)
  }
}
</script>
<style lang="less" scoped></style>
