<template>
	<view class="page">
<!-- 		<video :src="videdList[0].src" id="myVideo" class="video" @pause="handlePause"
    @timeupdate="handleTimeupdate"></video> -->
<!--    <view class="content">
      <view class="p24" v-if="matches.length > 0">
        <Matches :list="matches" />
      </view>    
    </view>  -->     
    
	</view>
</template>

<script>
  import Matches from '@/components/Matches/main'
	export default {
    components: { Matches },
		data() {
			return {
        videdList: [
          {idx: 0, id: '10029026500', src: 'https://markable-china-miniapp.s3.cn-north-1.amazonaws.com.cn/iqiyi/AQY-video-qad/10029026500.mp4'},
          {idx: 1, id: '3250160600', src: 'https://markable-china-miniapp.s3.cn-north-1.amazonaws.com.cn/iqiyi/AQY-video-qad/3250160600.mp4'}
        ],
        currentIdx: 0,
        currentTime: 0,
        param: {
          time: '00000',
          video_id: '',
          options: {
            limit: 5,
            detection_relevance: 60,
            product_relevance: 60,
            jd_only: true
          }
        },
        matches: []
			}
		},
		methods: {
			handlePause (e) {
        console.log(this.format(this.currentTime))
        this.param.time = this.format(this.currentTime)
        this.param.video_id = this.videdList[0].id
        uni.showLoading({
            title: '识别中...'
        })
        this.matches = []
        this.getVideoResult()
      },
      getVideoResult () {
      this.$api.getClientSearch({
          data: this.param
        }).then(res => {
          const { code, result, message } = res.data.data
          setTimeout(function () {
              uni.hideLoading();
          }, 1000)
          if (code == 20000 && result.length > 0) {
            let renderArr = [] // matches tag arr
            // result.sort(this.$filter.getMatchesSort('bounding_box'))
            result.map((v, idx) => {
              let matchesArr = []
              // 过滤掉无matches返回种类
              if (v.matches) {
                v.matches.map(m => {
                  // 过滤无效商品 无图 || 无价格 || 无连接 || 无价格符号 
                  if (m.images && m.images.length > 0 && m.images[0] && m.images[0].uri && this.$filter.getCurrency(m.data.currency) && m.data.url && m.data.price) {
                    matchesArr.push({
                      show: true, // 默认显示
                      ads: m.ads || false, // 是否推荐
                      isFilter: false, // 默认未经过filter
                      source: this.$filter.getShopSource(m.catalog.name), // 商品来源 电商
                      wechatlink: m.data.wechat_app_url ? m.data.wechat_app_url : '', // 微信link
                      thumbnail: this.$filter.getThumbnail(m.images[0].uri), // 商品缩略图
                      // images: imgArr,
                      name: m.data.name, // 商品名称
                      price: m.data.sale_price ? m.data.sale_price : m.data.price, // 商品价格
                      brand: m.data.brand, // 店铺名称
                      score: m.score ? this.$filter.getToFixed(m.score * 10) : '6.0', // 店铺评分
                      shoplink: m.data.url ? encodeURIComponent(m.data.url) : '', // 商品url
                      currency: this.$filter.getCurrency(m.data.currency) // 价格符号
                    })
                  } 
                })
              }     
              // 过滤没有matches数组
              if (matchesArr.length > 0) {
                // matches tag render
                renderArr.push({
                  index: idx,
                  tag: v.category.name ? this.$filter.getChCatalog(v.category.name) : '',
                  matches: matchesArr,
                  count: matchesArr.length
                })    
              }
            })
            console.log(renderArr, '商品及标签集合')
            this.matches = renderArr
          } else {
            console.log('暂无识别结果')
            this.$global.showToast('暂无识别结果')
          }
        })
      },
      handleTimeupdate (e) {
        const { currentTime } = e.mp.detail
        this.currentTime = Math.floor(currentTime)
        // console.log(this.currentTime)
      },
      format (time) {
        let timeStr = time.toString()
        if (!timeStr) {
          return '00000'
          console.log('默认视频起始')
        } else if (timeStr.length == 1) {
          return '0000' + timeStr
        } else if (timeStr.length == 2) {
          return '000' + timeStr
        } else if (timeStr.length == 3) {
          return '00' + timeStr
        } else if (timeStr.length == 4) {
          return '0' + timeStr
        } else {
          return timeStr
        }
      }
		}
	}
</script>

<style scoped>
  .video{
    width:100vw;
    /* height:100vh; */
  }
  .content{
    width:100%;
    height:auto;
    background: #fff;
    padding-bottom:100upx;
/*    position: absolute;
    left:0;
    top:0; */
    /* z-index: 2; */
    box-shadow:0px -4px 6px 0px rgba(0,0,0,0.11);
    -webkit-overflow-scrolling: touch;    
  }  
</style>
