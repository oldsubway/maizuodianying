<template>
  <div class="mySwiper">
    <van-row class="top" type="flex" justify="space-between">
      <van-col>剧照</van-col>
      <van-col class="top-right" @click="showAll">全部{{length}}&gt;</van-col></van-col>
    </van-row>
    <van-row class="swiper" type="flex">
      <van-col class="swiper-item" v-for="(item, index) in photos" :key="index" @click="showImage(index)"><van-image :src="item" width="150" height="80"></van-image></van-col>
    </van-row>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
export default {
  name: 'ImageSwiper',
  props: ['photos', 'length'],
  methods: {
    showAll() {
      this.$emit('updateIsAll')
    },
    showImage(index) {
      ImagePreview({
        images: this.photos,
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mySwiper {
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  .top {
    padding: 15px;
    .top-right {
      color: #797d82;
      font-size: 13px;
    }
  }
  .swiper {
    margin: 20px 0;
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .swiper-item {
      margin-left: 10px;
    }
    .swiper-item:first-child {
      margin-left: 15px;
    }
    .swiper-item:last-child {
      margin-right: 10px;
    }
  }
}
</style>
