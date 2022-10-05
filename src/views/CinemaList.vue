<template>
  <div>
    <van-nav-bar fixed :border="false" title="影院" :left-text="cityName + '▼'" right-text="按钮" @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="24" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu class="tag-menu" active-color="#1989fa">
      <van-dropdown-item :title="value1" class="tag-menu" ref="city">
        <van-tag v-for="(item, index) in districtList" :key="index" size="large" plain class="tag" @click="changeItem(item, index)" :class="index === active ? 'active' : ''">{{ item.fullname }}</van-tag>
      </van-dropdown-item>
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <van-list class="contain">
      <cinema-item v-for="(item, index) in cinemas" :key="index" :cinema="item"></cinema-item>
    </van-list>
    <router-view></router-view>
  </div>
</template>
<script>
import CinemaItem from '@/components/CinemaItem.vue'
import { getCinemaList } from '@/utils/getData.js'
import { getDistrict } from '@/utils/getAddress.js'
export default {
  name: 'CinmeList',
  components: {
    CinemaItem
  },
  data() {
    return {
      cinemas: [],
      loading: false,
      finished: false,
      isLoading: false,
      active: 0,
      cityName: '北京',
      value1: '全城',
      value2: 0,
      value3: 0,
      districtList: [
        {
          id: '',
          fullname: '全城'
        }
      ],
      option2: [
        { text: 'APP订票', value: 0 },
        { text: '前台兑换', value: 1 }
      ],
      option3: [
        { text: '最近去过', value: 0 },
        { text: '离我最近', value: 1 }
      ]
    }
  },
  methods: {
    async initCinemaList() {
      this.$toast.loading()
      const { data: res } = await getCinemaList()
      if (res.status === 0) {
        this.$toast.clear()
        this.cinemas = [...this.cinemas, ...res.data.cinemas]
      }
    },
    async initDistrictList() {
      const res = await getDistrict(localStorage.getItem('cityId'))
      if (res.status === 0) {
        this.districtList = [...this.districtList, ...res.result[0]]
      }
    },

    changeItem(item, index) {
      console.log(item)
      this.value1 = item.fullname
      this.active = index
      this.$refs.city.toggle()
    },

    onClickLeft() {
      this.$router.push('/city')
    },

    onClickRight() {
      this.$router.push('/cinemas/search')
    }
  },
  created() {
    this.initCinemaList()
    this.initDistrictList()
    this.cityName = localStorage.getItem('cityName') || '北京'
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  margin-bottom: 46px;
  /deep/ .van-icon,
  /deep/ .van-nav-bar__text {
    color: black;
    font-size: 12px;
  }
}

.tag-menu {
  /deep/ .van-dropdown-item__content {
    display: flex;
    width: 98vw;
    padding: 10px;
    flex-wrap: wrap;
    justify-content: space-between;

    .van-tag {
      margin: 10px 0;
      margin-right: 10px;
      width: 80px;
      height: 30px;
      padding: 0;
      justify-content: center;
      font-size: 12px;
      color: #797d82;
      border-radius: 0;
      border-color: #dcddde;
    }
    .active {
      color: #1989fa;
    }
    &::after {
      content: '';
      flex: auto;
    }
  }
  /deep/ .van-dropdown-menu__bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-top: 46px;
    box-shadow: none;
  }
}

.van-list {
  margin-top: 90px;
}
</style>
