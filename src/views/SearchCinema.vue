<template lang="">
  <div class="search">
    <van-sticky>
      <van-search v-model="value" show-action action-text="取消" placeholder="请输入影院名称" @input="onInput" @clear="onClear" @cancel="onCancel"></van-search>
    </van-sticky>
    <van-divider :style="{ margin: '3px' }"></van-divider>
    <div v-if="!isSearch" class="content">
      <p>离你最近</p>
      <p>
        <van-tag v-for="(item, index) in tags" :key="index" color="#f4f4f4" text-color="#191a1b" size="large">{{ item.name }}</van-tag>
      </p>
    </div>
    <van-list v-if="result.length > 0" class="list">
      <cinema-item v-for="(item, index) in result" :key="index" :cinema="item"></cinema-item>
    </van-list>
    <van-cell v-else-if="isSearch">
      <van-empty description="没有找到匹配的城市" image="search" />
    </van-cell>
  </div>
</template>
<script>
import CinemaItem from '@/components/CinemaItem.vue'
import { getCinemaList } from '@/utils/getData.js'
export default {
  name: 'SearchCinema',
  components: {
    CinemaItem
  },
  data() {
    return {
      cinemas: [],
      tags: [],
      result: [],
      value: '',
      isSearch: false
    }
  },
  methods: {
    onCancel() {
      this.$router.back()
    },

    async initCinemaList() {
      const { data: res } = await getCinemaList()
      if (res.status === 0) {
        this.cinemas = [...res.data.cinemas]
        this.tags = res.data.cinemas.slice(0, 5)
      }
    },

    onClear(e) {
      this.isSearch = false
    },

    onInput(e) {
      if (e) {
        this.isSearch = true
        this.result = this.cinemas.filter(item => item.name.toUpperCase().includes(e.toUpperCase()) || item.address.toUpperCase().includes(e.toUpperCase()))
      } else {
        this.isSearch = false
        this.result = []
      }
    }
  },
  created() {
    this.initCinemaList()
  }
}
</script>
<style lang="less" scoped>
.search {
  height: 100vh;
  background-color: white;
  .content {
    margin-top: 10px;
    padding-left: 20px;
    color: #bdc0c5;
    font-size: 13px;
    .van-tag {
      margin: 10px;
      margin-left: 0;
    }
    .list {
      background-color: white;
    }
  }
}
</style>
