import request from './request'

// 获取热映电影 https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1
// 获取即将上线电影 https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2
// 获取电影详情 https://m.maizuo.com/gateway?filmId=6109
// 获取电影院 https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1
// 获取城市列表 获取电影院 https://m.maizuo.com/gateway
// 请求方式都为get
export const getFilmList = function (pageNum, type) {
  return request({
    params: {
      cityId: localStorage.getItem('cityId') || 110100,
      pageSize: 10,
      type,
      pageNum
      // k: 4805173
    },
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16640216082567338176020481","bc":"110100"}',
      'X-Host': 'mall.film-ticket.film.list'
    }
  })
}

export const getFilmInfo = function (id) {
  return request({
    params: {
      filmId: id
    },
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16640216082567338176020481","bc":"110100"}',
      'X-Host': 'mall.film-ticket.film.info'
    }
  })
}

export const getCinemaList = function () {
  return request({
    params: {
      cityId: localStorage.getItem('cityId') || 110100,
      ticketFlag: 1
    },
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16640216082567338176020481","bc":"110100"}',
      'X-Host': 'mall.film-ticket.cinema.list'
    }
  })
}

export const getCityList = function () {
  return request({
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16640216082567338176020481","bc":"110100"}',
      'X-Host': 'mall.film-ticket.city.list'
    }
  })
}
