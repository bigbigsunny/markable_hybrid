import CONFIG from '@/config/config.js'
import { GET, POST } from '@/utils/request.js'
const url = CONFIG.HOST
const videoUrl = CONFIG.HOST_VIDEO
const userUrl = CONFIG.HOST_USER
// 获取列表混合
const getList = function (data) {
  return GET(`${videoUrl}/catalog`, data)
}
// 获取欧美女性列表
const getWomenList = function (data) {
  return GET(`${url}/catalogs/catalog-style-women/items`, data)
}
// 获取欧美男性列表
const getMenList = function (data) {
  return GET(`${url}/catalogs/catalog-style-men/items`, data)
}
// 获取欧美女性列表
const getAsianList = function (data) {
  return GET(`${url}/catalogs/catalog-style-asian-celebrities/items`, data)
}
// 获取视频列表
const getVideoList = function (data) {
  return GET(`${videoUrl}/videos`, data)
}
// 根据ID获取视频详情
const getVideoDetail = function (id) {
  return GET(`${videoUrl}/videodata/${id}`)
}
// 根据图片URI 获取同款结果
const getImageSearch = function (data) {
  // return POST(`${url}/image/search`, data)
  return POST(`${videoUrl}/image`, data)
  // return POST(`http://localhost:13370/client/snapshot`, data)
}

// 根据图片URI 获取同款结果
const getClientSearch = function (data) {
// return POST(`http://localhost:13370/client/snapshot`, data)
  // return POST(`https://iqiyi-poc.markableai.cn/client/snapshot`, data)
  return POST(`https://dev.markableai.cn/client/snapshot`, data)
  // return POST(`${videoUrl}/client/snapshot`, data)
  
}

// 根据图片URI 获取同款穿搭
const getImageStyle = function (data) {
  // return POST(`${url}/image/search/style`, data)
  return POST(`${videoUrl}/image/style`, data)
}
// 上传图片
const uploadImg = function (data) {
  return POST(`${userUrl}/api/home/index/upload_log`, data)
}
// 第三方登录
const tLogin = function (data) {
  return POST(`${userUrl}/api/home/index/wx_user`, data)
}
// 记录图片浏览量
const browseLog = function (data) {
  return GET(`${userUrl}/api/home/index/browse_log`, data)
}
export default {
  getList,
  getWomenList,
  getMenList,
  getAsianList,
  getVideoList,
  getImageSearch,
  getImageStyle,
  uploadImg,
  getVideoDetail,
  tLogin,
  browseLog,
  getClientSearch
}