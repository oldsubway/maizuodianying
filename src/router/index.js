import Vue from "vue";
import VueRouter from "vue-router";
import CinemaList from "@/views/CinemaList.vue";
import FilmList from "@/views/FilmList.vue";
import FilmTab from "@/views/FilmTab.vue";
import FilmInfo from "@/views/FilmInfo.vue";
import SearchCinema from "@/views/SearchCinema.vue";
import CityList from "@/views/CityList.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/films",
  },
  {
    path: "/films",
    component: FilmTab,
    redirect: "/films/nowPlaying",
    /* filmType为电影类型，active为激活的tab所有 */
    children: [
      {
        path: "nowPlaying",
        component: FilmList,
        name: "nowPlaying",
        meta: {
          tabbarShow: true,
          filmType: 1,
          active: 0,
        },
      },
      {
        path: "commingSoon",
        component: FilmList,
        name: "commingSoon",
        meta: {
          tabbarShow: true,
          filmType: 2,
          active: 1,
        },
      },
    ],
  },
  {
    path: "/films/:id",
    component: FilmInfo,
    props: true,
    meta: {
      tabbarShow: false,
    },
  },
  {
    path: "/cinemas",
    component: CinemaList,
    meta: {
      tabbarShow: true,
    },
  },
  {
    path: "/cinemas/search",
    component: SearchCinema,
  },
  {
    path: "/city",
    component: CityList,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
