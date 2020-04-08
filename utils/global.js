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

function showToast (title, duration = 1000, icon = 'none') {
  uni.showToast({
    title,
    duration,
    icon
  })
}

export default {
  getSystemInfo,
  navigateTo,
  showToast
}