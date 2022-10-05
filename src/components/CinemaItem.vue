<template lang="">
  <van-row class="item">
    <van-divider></van-divider>
    <van-row type="flex" align="center" justify="space-between" class="content">
      <van-col span="16">
        <van-row class="van-ellipsis">{{ cinema.name }}</van-row>
        <van-row class="van-ellipsis address">{{ cinema.address }}</van-row>
      </van-col>
      <van-col span="4">
        <div class="price">
          <span>{{ cinema.lowPrice / 100 }}</span>
        </div>
      </van-col>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: 'CinemaItem',
  props: ['cinema']
}
</script>
<style lang="less" scoped>
.item {
  margin-bottom: 10px;
  .content {
    padding-left: 20px;
  }
  .address {
    margin-top: 5px;
    color: #797d82;
    font-size: 13px;
  }
  .price {
    font-size: 12px;
    color: #1989fa;
    span {
      font-size: 18px;
    }
    &::before {
      content: '¥ ';
    }
    &::after {
      content: '起';
    }
  }
}
</style>
