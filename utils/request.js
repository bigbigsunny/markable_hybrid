export const GET = function (url, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data,
      method: 'GET',
      header: {
        'Authorization': 'Bearer 5db0182f0785be000fd4e534', // 授权token 参考之前APP的写法
        'user_id': 'testiaiyi',
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=14400', // 2 * 24 * 60 * 60 2天过期 与后台同步
        'X-Client': 'mini_app'
      },
      success (res) {
        resolve(res)
      },
      fail (res) {
        reject(res)
        console.log(`${url}加载失败`, res)
      },
      complete: function () {
        console.log(`${url}加载完成`)
      }
    })
  })
}

export const POST = function (url, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data,
      method: 'POST',
      header: {
        "user_id": '5e1863dfdea880002a87d693',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE4NjNkZmRlYTg4MDAwMmE4N2Q2OTUiLCJpYXQiOjE1Nzg3MzY3MDcsImV4cCI6MTU3OTk0NjMwN30.3LyEvyMaLkmOc487tz5toKPBtZK8SfmP5oDDZsIlfeU',
        // 'Authorization': 'Bearer 5db0182f0785be000fd4e534', // 授权token 参考之前APP的写法
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=14400', // 2 * 24 * 60 * 60 2天过期 与后台同步
        'X-Client': 'mini_app'
      },
      success (res) {
        if (res.statusCode === 408) {
          wx.showToast({
            title: res.data.errors[0].detail,
            duration: 1000,
            icon: 'none'
          })
        }
        resolve(res)
      },
      fail (res) {
        reject(res)
        console.log(`${url}加载失败`, res)
      },
      complete: function () {
        console.log(`${url}加载完成`)
      }
    })
  })
}
