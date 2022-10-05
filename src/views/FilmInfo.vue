<template lang="">
  <div>
    <div class="film-detail" v-show="!isAll">
      <van-nav-bar :class="{ hiddenTop }" :border="false" fixed @click-left="back">
        <template #left>
          <van-icon name="arrow-left" size="25" class="showBack" color="black"></van-icon>
        </template>
        <template #title>
          <div :class="{ hiddenTitle }">{{ film.name }}</div>
        </template>
      </van-nav-bar>
      <van-image :src="film.poster" height="200" width="100%" fit="cover"></van-image>
      <!-- 电影相关信息 -->
      <div class="film-info" ref="info">
        <van-row type="flex" justify="space-between" align="center">
          <van-col>
            <span class="film-name">{{ film.name }}</span>
            <span class="film-type">{{ film.filmType.name }}</span>
          </van-col>
          <van-col class="film-grade">{{ film.grade }}</van-col>
        </van-row>
        <van-row>{{ film.category }}</van-row>
        <van-row>{{ time }}</van-row>
        <van-row>{{ film.nation }} | {{ film.runtime }}分钟 </van-row>
        <van-row class="film-synopsis" :class="{ hidden: isHidden }" ref="synopsis">{{ film.synopsis }} </van-row>
        <van-row type="flex" justify="center"><van-icon size="20" :name="hiddenIcon" @click="changeHidden"></van-icon> </van-row>
      </div>
      <actor-swiper :actors="film.actors"></actor-swiper>
      <image-swiper :photos="film.photos" :length="length" @updateIsAll="changeIsAll"></image-swiper>
      <van-tabbar fixed>
        <van-tabbar-item>选座购票</van-tabbar-item>
      </van-tabbar>
    </div>
    <div v-show="isAll">
      <van-nav-bar :title="'剧照(' + length + ')'" @click-left="backInfo">
        <template #left>
          <van-icon name="arrow-left" size="20" color="black"></van-icon>
        </template>
      </van-nav-bar>
      <van-row type="flex" gutter="10">
        <van-col v-for="(item, index) in film.photos" span="8" :key="index" @click="showImage(index)"><van-image width="100%" height="80" fit="contain" :src="item"></van-image></van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import ImageSwiper from '@/components/ImageSwiper'
import ActorSwiper from '@/components/ActorSwiper'
import { getFilmInfo } from '@/utils/getData.js'
import { ImagePreview } from 'vant'
export default {
  name: 'FilmInfo',
  components: {
    ImageSwiper,
    ActorSwiper
  },
  props: ['id'],
  data() {
    return {
      film: {
        filmType: {}
      },
      // 标题
      hiddenTop: false,
      hiddenTitle: false,
      // 展开或收起图标
      isHidden: true,
      hiddenIcon: 'arrow-down',
      iconFlag: false,
      // 是否显示剧照
      isAll: false,
      length: 0
    }
  },
  computed: {
    time() {
      const time = Number(String(this.film.premiereAt))
      return this.dayjs.unix(time).format('YYYY-MM-DD上映')
    }
  },
  methods: {
    back() {
      this.$router.back()
    },

    async initFilmDetail() {
      const { data: res } = await getFilmInfo(this.id)
      console.log(res.data.film)
      this.film = res.data.film
      this.length = res.data.film.photos.length
    },

    changeHidden() {
      if (this.iconFlag) return
      this.iconFlag = true
      this.isHidden = !this.isHidden
      if (this.isHidden) {
        this.hiddenIcon = 'arrow-up'
        setTimeout(() => {
          this.hiddenIcon = 'arrow-down'
          this.iconFlag = false
        }, 500)
      } else {
        this.hiddenIcon = 'arrow-up'
        this.iconFlag = false
      }
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
      if (window.scrollY > 100) {
        this.hiddenTitle = false
        this.hiddenTop = false
      } else {
        this.hiddenTitle = true
        this.hiddenTop = true
      }
    },

    changeIsAll() {
      this.isAll = true
      window.removeEventListener('scroll', this.scrollThrottler)
    },
    backInfo() {
      this.isAll = false
      this.$nextTick(() => {
        window.scrollTo(0, 160)
        window.addEventListener('scroll', this.scrollThrottler)
      })
    },
    showImage(index) {
      ImagePreview({
        images: this.film.photos,
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  created() {
    this.initFilmDetail()
  },
  mounted() {
    window.addEventListener('scroll', this.scrollThrottler)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollThrottler)
  }
}
</script>
<style lang="less" scoped>
.film-detail {
  width: 100%;
  padding-bottom: 50px;
  /deep/ .van-nav-bar__left {
    padding-left: 5px;
  }
  .hiddenTop {
    background-color: rgba(255, 255, 255, 0);
    .showBack {
      padding-left: 0;
      background-color: rgba(244, 244, 244, 0.5);
      font-weight: 400;
      border-radius: 50%;
    }
    .hiddenTitle {
      opacity: 0;
    }
  }

  .film-info {
    background-color: white;
    font-size: 14px;
    color: #797d82;
    padding: 15px;
    .van-row {
      margin-top: 5px;
      .film-name {
        font-size: 18px;
        font-weight: 900;
        margin-right: 5px;
      }
      .film-type {
        vertical-align: text-top;
        padding: 0 3px;
        background-color: #d2d6dc;
        color: white;
        font-size: 12px;
      }
      .film-grade {
        color: #1989fa;
        font-size: 18px;
        font-style: italic;
        &::after {
          content: '分';
          font-size: 12px;
          font-style: normal;
        }
      }
    }
    .film-synopsis {
      max-height: 1000px;
      transition: max-height 0.5s ease;
    }
    .hidden {
      max-height: 38px !important;
      overflow: hidden;
    }
  }
  /deep/.van-tabbar {
    margin-top: 1000px;
    height: 50px;
  }
  .van-tabbar-item {
    height: 100%;
    background-color: #1989fa;
    color: white;
  }
}
</style>
