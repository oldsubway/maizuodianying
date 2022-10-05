<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <film-item v-for="item in films" :to="item.filmId" :key="item.filmsId" :film="item"></film-item>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import FilmItem from '@/components/FilmItem.vue'
import { getFilmList } from '@/utils/getData.js'
export default {
  export: 'FilmList',
  components: {
    FilmItem
  },
  data() {
    return {
      films: [],
      total: 0,
      pagenum: 1,
      loading: true,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    async initFilmList() {
      const { data: res } = await getFilmList(this.pagenum, this.$route.meta.filmType)
      if (res.status === 0) {
        this.films = [...this.films, ...res.data.films]
        this.total = res.data.total
      }
      this.loading = false
      this.isLoading = false
    },

    onLoad() {
      this.pagenum++
      this.initFilmList()
      if (this.films.length >= this.total) {
        this.finished = true
      }
    },

    onRefresh() {
      this.pagenum = 1
      this.films = []
      this.initFilmList()
    }
  },

  created() {
    this.initFilmList()
  }
}
</script>
<style lang="less"></style>
