<template>
  <div class="mySwiper">
    <van-row class="top" type="flex" justify="space-between">
      <van-col>演职人员</van-col>
    </van-row>
    <van-row class="swiper" type="flex">
      <van-row class="swiper-item" type="flex" v-for="(item, index) in actors" :key="index">
        <van-image :src="item.avatarAddress" fit="cover" width="85" height="85"></van-image>
        <van-col class="actor-name">{{ item.name }}</van-col>
        <van-col class="actor-role">{{ item.role }}</van-col>
      </van-row>
    </van-row>
  </div>
</template>
<script>
export default {
  name: 'ActorSwiper',
  props: ['actors']
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
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .swiper-item {
      flex-direction: column;
      text-align: center;
      margin-left: 10px;
      font-size: 12px;
      .actor-name {
        margin: 5px 0 3px;
      }
      .actor-role {
        color: #797d82;
      }
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
