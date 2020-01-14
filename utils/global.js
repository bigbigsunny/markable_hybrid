const navigateTo = function (url) {
  uni.navigateTo({
     url,
  })
}
// 获取系统信息
const getSystemInfo = function (attr) {
  if (!attr) {
    return uni.getSystemInfoSync()
  }
  const system = uni.getSystemInfoSync()
  return system[attr]
}

export default {
  getSystemInfo,
  navigateTo
}