<template lang="">
  <div class="list">
    <van-nav-bar fixed z-index="2" title="当前城市" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" size="large"></van-icon>
      </template>
    </van-nav-bar>
    <van-sticky :offset-top="46">
      <van-search v-model="value" :show-action="showAction" :clearable="false" background="#f4f4f4" action-text="取消" placeholder="请输入城市名称或拼音" @input="onInput" @focus="onFocus" @cancel="onCancel"></van-search>
    </van-sticky>
    <van-index-bar v-if="!showSearch" :index-list="indexList" :sticky-offset-top="100" highlight-color="#1989fa">
      <van-cell-group>
        <van-cell>
          <p>当前所在城市</p>
          <van-row type="flex" justify="space-between">
            <van-col span="7" @click="saveCity(localCity)"> {{ localCity.name }} </van-col>
          </van-row>
        </van-cell>
        <van-cell>
          <p>热门城市</p>
          <van-row type="flex" justify="space-between">
            <van-col span="7" v-for="item in hostCityList" :key="item.cityId" @click="saveCity(item)">
              {{ item.name }}
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
      <div v-for="(value, key) in cityObj" :key="key">
        <van-index-anchor :index="key"> </van-index-anchor>
        <van-cell-group>
          <van-cell v-for="(item, index) in value" :key="index" :title="item.name" @click="saveCity(item)" />
        </van-cell-group>
      </div>
    </van-index-bar>
    <van-list v-else>
      <van-cell v-for="(item, index) in result" :key="index" :title="item.name" @click="saveCity(item)" />
      <van-cell v-show="showEmpty">
        <van-empty description="没有找到匹配的城市" image="search" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getCityList } from '@/utils/getData.js'
import { getAddress } from '@/utils/getAddress.js'
export default {
  name: 'CityList',
  data() {
    return {
      hostCityList: [],
      cityObj: {},
      localCity: {},
      cityList: [],
      indexList: [],
      result: [],
      value: '',
      showAction: false,
      showSearch: false,
      showEmpty: false
    }
  },
  methods: {
    onFocus() {
      this.showAction = true
    },

    onCancel() {
      this.showAction = false
      this.showSearch = false
      this.result = []
    },

    onInput(e) {
      if (e) {
        this.showSearch = true
        this.showEmpty = false
        this.result = this.cityList.filter(item => item.name.includes(e) || item.pinyin.includes(e.toLowerCase()))
      } else {
        this.showEmpty = true
        this.result = []
      }
    },

    onClickLeft() {
      this.$router.back()
    },
    async getLocalCity() {
      const res = await getAddress()
      if (res.status === 0) {
        this.localCity.cityId = res.result.ad_info.adcode
        this.localCity.name = res.result.ad_info.city
      }
    },

    async initCityList() {
      const { data: res } = await getCityList()
      if (res.status === 0) {
        this.cityList = [...res.data.cities]
        const data = res.data.cities.sort((a, b) => {
          if (a.pinyin > b.pinyin) return 1
          return -1
        })
        data.forEach(item => {
          if (item.isHot) this.hostCityList.push(item)
          const index = item.pinyin.charAt(0).toUpperCase()
          if (Object.prototype.hasOwnProperty.call(this.cityObj, index)) {
            this.cityObj[index].push(item)
          } else {
            this.cityObj[index] = []
            this.indexList.push(index)
          }
        })
      }
    },

    saveCity(city) {
      console.log(city.cityId)
      localStorage.setItem('cityId', city.cityId)
      localStorage.setItem('cityName', city.name)
      this.$router.push('/')
    }
  },
  created() {
    this.initCityList()
    this.getLocalCity()
  }
}
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  height: 100vh;
  position: relative;
  .van-nav-bar {
    .van-icon {
      color: black;
    }
  }
  .van-search {
    position: relative;
    width: 100%;
    z-index: 2;
    .van-field {
      background-color: white;
    }
  }
  .van-index-bar {
    margin-top: 40px;
    .van-cell-group {
      padding: 10px 0;
      .van-col {
        margin: 5px;
        padding: 5px 0;
        background-color: #f4f4f4;
        text-align: center;
      }
    }
  }
  .van-list {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 100px;
    background-color: white;
  }
}
</style>
