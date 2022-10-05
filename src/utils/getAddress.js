import { jsonp } from 'vue-jsonp'
// 腾讯地图key YHMBZ-G4AKI-FYXGU-53NNO-M7SMO-LTF2R
export const getAddress = function () {
  return jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
    key: 'YHMBZ-G4AKI-FYXGU-53NNO-M7SMO-LTF2R',
    output: 'jsonp'
  })
}
const Id = ['110100', '120100', '310100', '500100']
export const getDistrict = function (id) {
  const newId = Id.find(item => item === id)
  if (newId) id = newId - 100
  return jsonp('https://apis.map.qq.com/ws/district/v1/getchildren', {
    key: 'YHMBZ-G4AKI-FYXGU-53NNO-M7SMO-LTF2R',
    id,
    output: 'jsonp'
  })
}
