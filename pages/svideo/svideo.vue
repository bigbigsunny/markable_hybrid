<template>
    <view class="page">
        <swiper class="swiper" :circular="circular" :vertical="true" @change="onSwiperChange">
            <swiper-item v-for="item in videoList" :key="item.id">
                <video class="video" :id="item.id" :ref="item.id" :src="item.src" :controls="true" :loop="true"
                    :show-center-play-btn="false" @click="togglePlay" @timeupdate="handleTimeupdate"></video>
            </swiper-item>
        </swiper>
        <view class="content" :style="{top: scrollTop}">
        <view class="title-box">
          <text class="p24 title weight">同款推荐</text>
          <view class="filter-box" @click="handlePopup()">
            <image src="/static/images/cancel.png" class="fliter-icon" mode="widthFix"></image>
          </view>       
        </view>          
          <view class="p24" >
            <Matches :list="matches" />
          </view>           
        </view>  
    </view>
</template>
<script>
    var videoData = [{
            src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-01.mp4'
        },
        {
            src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-02.mp4'
        },
        {
            src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-03.mp4'
        },
        {
            src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-01.mp4'
        },
        {
            src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-02.mp4'
        },
        {
            src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-03.mp4'
        }
    ];
    import Matches from '@/components/Matches/main'
    export default {
        components: { Matches },
        data() {
            return {
                circular: true,
                videoList: [
                ],
                videoDataList: [],
                mockData: ['92343700-01-18-31-300', '92343700', '875112600-00-23-08-300', '875112600', '835033400-00-19-23-300', '835033400', '4494309200-00-07-04-300',
                '4494309200', '2792454400-00-30-08-300', '2792454400', '2119833200-00-01-55-300', '2119833200', '13512996000-00-16-04-300',
                '13512996000', '13342399900-00-22-03-300', '13342399900', '130088896001-00-10-35-300', '130088896001', '11685671300-00-07-13-300',
                '11685671300', '11532266600-00-30-39-300', '11532266600', '10816079500-00-07-01-300', '10816079500', '10736140700-00-01-41-300',
                '10736140700', '10702713600-00-24-23-300', '10702713600', '10127072200-00-24-44-300', '10127072200'],
                url: 'https://markable-china-miniapp.s3.cn-north-1.amazonaws.com.cn/iqiyi/AQY-30/',
                play: false,
                param: {
                  time: '00000',
                  video_id: '',
                  options: {
                    limit: 5,
                    detection_relevance: 60,
                    product_relevance: 60,
                    jd_only: false
                  }
                },                
                currentTime: 0,
                matches: [],
                scrollTop: '100vh',
                showList: [],
                videoIdList: []
            }
        },
        onLoad(e) {},
        onReady() {
          let tempData = []
            // this.$global.showLoading('视频加载中...')
            this.mockData.map((v, idx) => {
              if (v.indexOf('-') == -1) {
                 tempData.push(v)
              }
            })
            console.log(tempData)
            this.mockData = tempData
            this.init();
            this.getData();
        },
        methods: {
         load () {
           uni.hideLoading()
         },
         handlePopup () {
           this.scrollTop = '100vh'
           this.togglePlay()
         },
         getVideoResult () {
           // this.$global.showToast('点击读取商品')
          this.$api.getClientSearch({
              data: this.param
            }).then(res => {
              const { code, result, message } = res.data.data
                  uni.hideLoading();
              if (code == 20000 && result.length > 0) {
                this.scrollTop = '20vh'
                let renderArr = [] // matches tag arr
                // result.sort(this.$filter.getMatchesSort('bounding_box'))
                result.map((v, idx) => {
                  let matchesArr = []
                  // 过滤掉无matches返回种类
                  if (v.matches) {
                    v.matches.map(m => {
                      // 过滤无效商品 无图 || 无价格 || 无连接 || 无价格符号 
                      // if (m.images && m.images.length > 0 && m.images[0] && m.images[0].uri && this.$filter.getCurrency(m.data.currency) && m.data.url && m.data.price) {
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
                      // } 
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
          },        
            togglePlay () {
              console.log(this.play)
              if (this.play) {
                this._videoContextList[this._videoIndex].pause()
                this.param.time = this.format(this.currentTime)
                // let video_id = this.mockData[this._videoIndex].split('-')[0]
                let video_id = this.mockData[this._videoIndex]
                console.log(video_id)
                this.param.video_id = video_id
                // this.param.time = '02589'
                // this.param.video_id = '3250160600'
                uni.showLoading({
                    title: '识别中...'
                })
                this.matches = []
                this.getVideoResult()                
              } else {
                this._videoContextList[this._videoIndex].play()
                this.scrollTop = '100vh'
              }
              this.play = !this.play
            },
            init() {
                this._videoIndex = 0;
                this._videoContextList = [];
                this.mockData.map((v, idx) => {
                  this.videoList.push({
                    id: `video${idx}`,
                    src: '',
                    img: ''
                  })
                })                
                for (var i = 0; i < this.videoList.length; i++) {
                    this._videoContextList.push(uni.createVideoContext('video' + i, this));
                }
                this._videoDataIndex = 0;
                // this._videoContextList[0].play()
            },
            getData(e) {
              let tempVideoData = []
              this.mockData.map((v, idx) => {
                tempVideoData.push({
                  src: `${this.url}${v}.mp4`,
                })
              })  
              videoData = tempVideoData
              this.videoDataList = videoData;
              setTimeout(() => {
                  this.updateVideo(true);
              }, 200)
            },
            onSwiperChange(e) {
                // this.$global.showLoading('视频加载中...')
                this.play = true
                this.currentTime = 0
                let currentIndex = e.detail.current;
                if (currentIndex === this._videoIndex) {
                    return;
                }

                let isNext = false;
                if (currentIndex === 0 && this._videoIndex === this.videoList.length - 1) {
                    isNext = true;
                } else if (currentIndex === this.videoList.length - 1 && this._videoIndex === 0) {
                    isNext = false;
                } else if (currentIndex > this._videoIndex) {
                    isNext = true;
                }

                if (isNext) {
                    this._videoDataIndex++;
                } else {
                    this._videoDataIndex--;
                }

                if (this._videoDataIndex < 0) {
                    this._videoDataIndex = this.videoDataList.length - 1;
                } else if (this._videoDataIndex >= this.videoDataList.length) {
                    this._videoDataIndex = 0;
                }

                this.circular = (this._videoDataIndex != 0);

                if (this._videoIndex >= 0) {
                    this._videoContextList[this._videoIndex].pause();
                    this._videoContextList[this._videoIndex].seek(0);
                }

                this._videoIndex = currentIndex;

                setTimeout(() => {
                    this.updateVideo(isNext);
                }, 200);
            },
            getNextIndex(isNext) {
                let index = this._videoIndex + (isNext ? 1 : -1);
                if (index < 0) {
                    return this.videoList.length - 1;
                } else if (index >= this.videoList.length) {
                    return 0;
                }
                return index;
            },
            getNextDataIndex(isNext) {
                let index = this._videoDataIndex + (isNext ? 1 : -1);
                if (index < 0) {
                    return this.videoDataList.length - 1;
                } else if (index >= this.videoDataList.length) {
                    return 0;
                }
                return index;
            },
            updateVideo(isNext) {
                this.$set(this.videoList[this._videoIndex], 'src', this.videoDataList[this._videoDataIndex].src);
                this.$set(this.videoList[this.getNextIndex(isNext)], 'src', this.videoDataList[this.getNextDataIndex(isNext)].src);
                setTimeout(() => {
                    this._videoContextList[this._videoIndex].play();
                    console.log(this._videoContextList)
                }, 200);
                console.log(321321)
                console.log("v:" + this._videoIndex + " d:" + this._videoDataIndex + "; next v:" + this.getNextIndex(
                    isNext) + " next d:" + this.getNextDataIndex(isNext));
            }
        }
    }
</script>

<style scoped>
    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        height:100vh;
        /* min-height: 100%; */
        overflow: hidden;
        /* display: flex; */
    }
    /* #endif */

    .page {
        /* flex: 1; */
        width: 100vw;
        height:100vh;
        /* min-height: 100%; */
        overflow: hidden;        
    }

    .swiper {
        /* flex: 1; */
        width:100vw;
        height:100vh;
        overflow: hidden;        
        background-color: #fff;
    }

    .swiper-item {
      width:100%;
      height:100%;
        /* flex: 1; */
    }

    .video {
        /* flex: 1; */
        width:100vw;
        height:100vh;
        /* #ifndef APP-PLUS */
        width: 100%;
        /* #endif */
    }
    .content{
      width:100vw;
      height:80vh;
      transition: top .6s;
      position: absolute;
      left:0;
      /* top:20vh; */
      background: #fff;overflow-y: scroll;
    }
  .title-box{
    width:100%;
    height:40upx;
    line-height: 40upx;
    padding: 22upx 0 26upx;
    display:block;
    background: #fff;
  }
  .title{
    color: #525252;
    font-size: 30upx;
    float: left;
  }
  .filter-box{
    width:30upx;
    height:30upx;
    float:right;
    margin-right:24rpx;
    /* background: #f00; */
  }
  .fliter-icon{
    width:30upx;
    height:30upx;
    /* margin-top:3upx; */
    /* #ifdef H5 */
    /* margin-top:5upx; */
    /* #endif */
  }    
</style>
