<template lang="">
  <a :href="to">
    <van-row type="flex" align="center" id="film-item">
      <van-col span="6">
        <van-image :src="film.poster" width="66px" fit="fill" />
      </van-col>
      <van-col span="14" class="details">
        <h3 class="van-ellipsis">
          {{ film.name }}<span>{{ film.filmType.name }}</span>
        </h3>
        <div class="grade">
          <p v-if="film.grade">
            观众评分:<span>{{ film.grade }}</span>
          </p>
        </div>
        <p class="van-ellipsis">
          主演：<span v-for="(item, index) in film.actors" :key="index">{{ item.name }}</span>
        </p>
        <span v-if="type === 1">{{ film.nation }} | {{ film.runtime }}分钟</span>
        <span v-else>上映日期：{{ time }}</span>
      </van-col>
      <van-col span="4"><van-button type="info" plain size="mini">预购</van-button></van-col>
    </van-row>
  </a>
</template>
<script>
export default {
  name: 'FilmItem',
  props: {
    to: {
      default: '#'
    },
    film: {}
  },
  data() {
    return {
      type: 1
    }
  },
  computed: {
    // 即将上映的日期
    time() {
      const time = Number(String(this.film.premiereAt))
      return this.dayjs.unix(time).format('ddd M月D日')
    }
  },
  watch: {
    $route() {
      console.log(this.$route.meta.filmType)
      this.type = this.$route.meta.filmType
    }
  }
}
</script>
<style lang="less" scoped>
#film-item {
  height: 124px;
  margin-bottom: 10px;
  margin-left: 2%;
  padding: 10px;
  padding-left: 0;
  padding-bottom: 0;
  border-top: 1px solid #d8dddd;
  .details {
    h3 {
      font-size: 16px;
      margin-bottom: 5px;
      span {
        font-size: 16px;
        margin-left: 5px;
        background-color: #c7c6c2;
        color: white;
      }
    }
    p,
    span,
    div {
      margin-bottom: 5px;
      font-size: 13px;
    }
    .grade {
      width: 100%;
      height: 20px;
      span {
        color: #1989fa;
        font-size: 19px;
      }
    }
  }
}
</style>
