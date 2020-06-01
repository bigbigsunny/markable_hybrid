<template>
  <view class="page" :class="imgHeight > 0 ? '' : 'bg-img'">
    <!--#ifdef H5-->
    <image src="/static/images/download.png" class="download" mode="widthFix" 
    v-if="from !== 'h5_oppo' && platform == 'ios'" @click="downLoad"></image>
    <!--#endif-->  
    <!--顶部图片展示区域-->
    <scroll-view :scroll-y="true" style="height:100vh" @scroll="listenScroll">
      <view class="img-box" :style="{height: imgHeight > windowHeight * 0.9 ? windowHeight * 0.9 + 'px' : imgHeight + 'px'}">
         <!-- <img :src="uri" style="width:100%;height:auto;display:block"/> -->
         <imgs :uri="uri" :thumbnail="thumbnail" :height="imgHeight" :box="boundingBox" @checkPoint="watchPoint"/>
      </view>
      <!--底部商品展示区域-->
      <view class="content" v-if="imgHeight > 0">
        <!--商品标题栏-->
        <view class="title-box" :class="scrollTop > top ? 'fix' : ''">
          <text class="p24 title weight">检索结果</text>
         <view class="filter-box">
            <image src="/static/images/filter.png" class="fliter-icon" mode="widthFix" @click="handlePopup('open')"/>
          </view>       
        </view>
        <!--商品栏-->
        <!--数据请求成功-->
        <block v-if="searchApi">
          <!--有数据返回-->
          <block v-if="!showDefault">
            <view class="p24" v-if="matches.length > 0">
              <Matches :list="matches" :index="idx" :from="from"/>
            </view>     
            <Loading v-else/>
          </block>
          <!--请求成功但无数据返回 显示无商品提示-->
          <block v-else>
            <default />
          </block>
        </block>
        <!--数据请求失败 显示加载失败-->
        <block v-else>
          <Loading status="error" @reload="handleReload"/>
        </block>
        <!--相关穿搭与更多穿搭-->
        <block v-if="searchApi && matches.length > 0">
         <view class="style-list">
            <text class="style-title p24">如何穿搭</text>
            <block v-for="(a, i) in styleList" :key="i" v-if="styleIdx == i">
               <water-fall :list="a" :change="true"/>
            </block>
          </view> 
  <!--        <view class="style-list">
            <text class="style-title p24">更多穿搭</text>
            <water-fall :list="moreStyle.list"/>
          </view>   -->
        </block>
      </view>
    </scroll-view>
    <!--筛选弹框-->
    <uni-popup ref="popup" type="center" custom>
      <view class="popup-box">
        <popup-filter @changeStatus="handlePopup" :check="filterList"/>
      </view>
    </uni-popup>    
  </view>
</template>

<script>
  import Imgs from '@/components/Imgs/main'
  import Matches from '@/components/Matches/main'
  import Loading from '@/components/Loading/main'
  import Default from '@/components/Default/main'
  import uniPopup from "@/components/uni-ui/uni-popup/uni-popup.vue"
  import PopupFilter from '@/components/Filter/main'
  import waterFall from '@/components/WaterFall/style.vue'
	export default {
    components: { Imgs, Matches, Loading, Default, uniPopup, PopupFilter, waterFall },
		data() {
			return {
        uri: '',
        windowTop: 0, // 顶部导航条高度  H5页面下使用
        windowWidth: this.$global.getSystemInfo('windowWidth'),
        windowHeight: this.$global.getSystemInfo('windowHeight'),
				imgHeight: 0, // 默认375 * 667
        filePath: '', // 上传的文件路径
        matches: [], // 图片商品集合
        boundingBox: [], // 图片坐标集
        idx: -1, // 默认不选择
        styleIdx: 0,
        searchApi: true, // 搜索同款结果接口返回结果 默认 TRUE
        showDefault: false, // 是否显示默认站位图 默认不显示
        contentTop: 0,
        filterList: [0, 1, 2, 3, 4, 5, 6], // 默认全选
        api: 'catalog-style-asian-celebrities', // 默认相关穿搭为亚洲男女
        styleList: [], // 如何穿搭
        prevList: [],
        moreStyle: { // 更多穿搭参数
          list: [],
          limit: 10,
          skip: this.$filter.getRandom(100) // 随机展示skip
        },
        from: 'h5_mai',
        platform: this.$global.getSystemInfo('platform'),
        scrollTop: 0,
        top: 0
			}
		},
    onLoad (options) {
      console.log(this.$global.getSystemInfo())
      // 没有传递正确的图片路径
      if (!options || !options.uri ) {
        uni.showToast({
          title: '没有检索到图片，检索失败！',
          icon: 'none'
        })
        return
      }
      this.resetData()
      const { uri, api, from } = options
      this.uri = uri
      this.thumbnail = this.$filter.getThumbnail(uri)
      this.api = api
      if (from) {
        this.from = from
      }
      // 获取图片信息
      this.getImgInfo()
      // 搜索同款结果
      this.getImageSearch()
      // this.getImgList() // 更多穿搭
    },
		methods: {
      resetData () {
        this.uri = '',
        this.windowTop = 0, // 顶部导航条高度  H5页面下使用
        this.windowWidth = this.$global.getSystemInfo('windowWidth'),
        this.windowHeight = this.$global.getSystemInfo('windowHeight'),
				this.imgHeight = 0, // 默认375 * 667
        this.filePath = '', // 上传的文件路径
        this.matches = [], // 图片商品集合
        this.boundingBox = [], // 图片坐标集
        this.idx = -1, // 默认不选择
        this.styleIdx = 0,
        this.searchApi = true, // 搜索同款结果接口返回结果 默认 TRUE
        this.showDefault = false, // 是否显示默认站位图 默认不显示
        this.contentTop = 0,
        this.filterList = [0, 1, 2, 3, 4, 5, 6], // 默认全选
        this.api = 'catalog-style-asian-celebrities', // 默认相关穿搭为亚洲男女
        this.styleList = [], // 如何穿搭
        this.prevList = [],
        this.scrollTop = 0
        this.top = 0
      },
      // 监听滚动
      listenScroll (e) {
        this.scrollTop = e.mp.detail.scrollTop
      },
      getImgInfo () {
        const that = this
        uni.getImageInfo({
          src: that.uri,
          success (image) {
           let ratio = image.width / that.windowWidth
           console.log(ratio)
           that.imgHeight = image.height / ratio  
           console.log(that.imgHeight)
          },
          fail () {
            console.log('获取图片信息失败')
          }
        })
      },
			getImageSearch () {
        this.$api.getImageSearch({
          'data': {
            'image_uri': this.$filter.getCDNtoUri(this.uri),
            'image': this.filePath,
            'score_method': 'qualityScore', // 排序
            'options': {
              'auto_detect_gender': true, // 不用打开性别自动识别
              'return_specific_nn_match': true, // 返回特定匹配
              'unique_products': true // 商品去重
            }
          }
        }).then(res => {
          // const { data, meta } = res.data
          let data = res.data.data.result
          let meta = res.data.meta
          // 没有数据返回
          if (!data || data.length === 0) {
            this.showDefault = true
            return
          }                   
          let imgRatio = meta.image.width ? this.$filter.getImgRatio(meta.image.width) : 1
          // 如果imgHeight没有传递过来 就通过接口去计算
          if (!this.imgHeight || this.imgHeight === 0) {
            this.imgHeight = this.$filter.getRatioHeight(meta.image.width, meta.image.height)
          }          
          let renderArr = [] // matches tag arr
          let boundingBoxArr = [] // bounding box arr 
          data.sort(this.$filter.getMatchesSort('bounding_box'))
          data.map((v, idx) => {
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
              // bounding box render
              boundingBoxArr.push({
                index: idx,
                zindex: this.$filter.getRandomIndex(v.bounding_box.x, v.bounding_box.y),
                x: this.$filter.getToFixed(v.bounding_box.x / imgRatio),
                y: this.$filter.getToFixed(v.bounding_box.y / imgRatio),
                width: this.$filter.getToFixed(v.bounding_box.width / imgRatio),
                height: this.$filter.getToFixed(v.bounding_box.height / imgRatio),
                pointX: this.$filter.getPointCenter(v.bounding_box.x / imgRatio, v.bounding_box.width / imgRatio),
                pointY: this.$filter.getPointCenter(v.bounding_box.y / imgRatio, v.bounding_box.height / imgRatio)
              })                  
            }             
          })
          console.log(renderArr, '商品及标签集合')
          console.log(boundingBoxArr, 'bounding box 集合')
          this.matches = renderArr
          this.boundingBox = boundingBoxArr
          
          this.getImgStyle() // 获取同款穿搭 在同款结果完成之后进行请求 
        }).catch(() => {
          // 加载失败
          this.searchApi = false
        })
      },
      getImgStyle () {
        this.$api.getImageStyle({
          'data': {
            'image_uri': this.$filter.getCDNtoUri(this.uri),
            'image': this.filePath,
            'catalogs': [
              {
                'name': this.api
              }
            ],
            'gender': ['women', 'men'],
            'options': {
              'auto_detect_gender': true // 不用打开性别自动识别
            }
          }
        }).then(res => {
          // 数据返回为string 需要做特殊字符解析
          let data = res.data.data.result
          if (typeof res.data === 'string') {
            console.log('unicode 处理')
            data = this.$filter.decodeUnicode(res.data).data
          }
          let renderArr = [] // style arr
          // 按照面积排序
          data.sort(this.$filter.getMatchesSort('bounding_box'))
          // 获取分类下的数组
          data.map(d => {
            let matchesArr = []
            d.matches.map((v, idx) => {
              matchesArr.push({
                thumbnail: this.$filter.getThumbnail(v.images[0].uri),
                uri: v.images[0].uri,
                desc: v.data.description ? v.data.description : this.$filter.getShareMsg(),
                color: this.$filter.randomBgColor(idx),
                date: v.data.date ? this.$filter.getDate(v.data.date) : '',
                likes: v.data.likes ? this.$filter.getNumber(v.data.likes) : this.$filter.getRandom(),
                tag: (v.data.tags && v.data.tags.length > 0) ? v.data.tags[0].tag : '',
                imgHeight: this.$filter.getRatioHeight(v.images[0].width, v.images[0].height),
                api: this.api,
                commentCount: this.$filter.getRandom(999)
              })
            })
            renderArr.push(matchesArr)
          })
          console.log(renderArr, '如何穿搭集合')
          this.styleList = renderArr          
        })
      },
      // 更多穿搭
      getImgList () {
        this.$api[this.$filter.getNameTransApi(this.api)]({
          limit: this.moreStyle.limit,
          skip: this.moreStyle.skip
        }).then(res => {
          let data = res.data.data
          if (typeof res.data === 'string') {
            console.log('unicode 处理')
            data = this.$filter.decodeUnicode(res.data).data
          }
          var renderArr = []
          data.map((v, idx) => {
            if (v.images[0].width && v.images[0].height) {
              renderArr.push({
                thumbnail: this.$filter.getThumbnail(v.images[0].uri),
                uri: v.images[0].uri,
                desc: v.data.description ? v.data.description : this.$filter.getShareMsg(),
                color: this.$filter.randomBgColor(idx),
                date: v.data.date ? this.$filter.getDate(v.data.date) : '',
                likes: v.data.likes ? this.$filter.getNumber(v.data.likes) : this.$filter.getRandom(),
                tag: (v.data.tags && v.data.tags.length > 0) ? v.data.tags[0].tag : '',
                imgHeight: this.$filter.getRatioHeight(v.images[0].width, v.images[0].height),
                commentCount: this.$filter.getRandom(999),
                api: v.catalog.name
              })
            }
          })          
          this.moreStyle.list = [...this.prevList, ...renderArr]
        })
      },
      // 选择中心点
      watchPoint (idx) {
        // 防止db click
        if (this.idx === idx) {
          return
        }
        if (idx === -1) {
          this.styleIdx = 0
          this.idx = -1
          return
        }        
        this.idx = idx
        this.styleIdx = idx
      },		
      // 点击下载
      downLoad () {
        // #ifdef H5
        window.location.href = 'https://apps.apple.com/cn/app/mai%E6%97%B6%E5%B0%9A%E5%A4%B4%E6%9D%A1/id1492797501'
        // #endif
      },
      // 重新加载
      handleReload () {
        this.showDefault = false
        this.searchApi = true
        setTimeout(() => {
          this.getImageSearch()
        }, 1500)
      },      
      // 点击打开筛选
      handlePopup (row) {
        let currentMatchesArr = this.matches
        // 筛选
        if (row instanceof Array) {
          this.filterList = row
          currentMatchesArr.map(p => {
            p.count = 0
            p.matches.map(m => {
              m.isFilter = false
              m.show = true
              row.map(i => {
                if (i === m.source.id) {
                  m.show = true
                  m.isFilter = true
                  p.count++
                } else if (m.isFilter) {
                  m.show = true
                } else {
                  m.show = false
                }
              })
            })
          })
          this.matches = currentMatchesArr
          this.$forceUpdate()
          // console.log(JSON.stringify(this.matches))
        }
        if (row == 'open') { 
          this.$refs.popup.open()
          
        } else {
          this.$refs.popup.close()
        }
      }
    },
    onReachBottom() {
      // this.moreStyle.skip+=10
      // this.loading = true
      // this.prevList = this.moreStyle.list
      // this.getImgList()
    },  
  }
</script>

<style scoped>
	.img-box{
		width:100%;
		height:auto;
    max-height: 90vh;
/*    position: fixed;
    left:0;
    top:0; */
    overflow-y:scroll;
	}
	.img{
		display: block;
		width:100%;
		height:auto;
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
    width:auto;
    height:30upx;
    float:right;
    margin-right:24rpx;
  }
  .fliter-icon{
    width:85.7upx;
    height:30upx;
    margin-top:3upx;
    /* #ifdef H5 */
    margin-top:5upx;
    /* #endif */
  }
  .style-list{
    width:100%;
    background: #fff;
    height:auto;
  }
  .style-title{
    display:block;
    color: #525252;
    font-size: 28upx;
    padding:30upx 0 10upx 0;
  }
  .download{
    width:100%;
    height:auto;
    display: block;
    position:fixed;
    left:0;
    bottom:0;
    z-index: 99999999;
  }
  .fix{
    position:sticky;
    top:0;
    z-index: 100;   
    box-shadow:0px 1px 6px 0px rgba(0,0,0,0.11)
  }  
</style>
