<template>
  <div class="webview-box" v-if="showpage">
    <div class="form-box">
      
      <select style="float:left;width:100px;height:30px;margin:7px 0 0 15px;" v-model="param.time">
        <option val="60" disabled>识别区间</option>
        <option v-for="(v, i) in selectTime" :key="i" :value="v.cc">{{v.date}}</option>
      </select>
      <select style="float:left;width:100px;height:30px;margin:7px 0 0 15px;" v-model="param.options.detection_relevance">
        <option val="60" disabled>品类评分</option>
        <option val="60">60</option>
        <option val="60">70</option>
        <option val="60">80</option>
        <option val="60">90</option>
        <option val="60">100</option>
      </select>
      <select style="float:left;width:100px;height:30px;margin:7px 0 0 15px;" v-model="param.options.product_relevance">
        <option disabled>商品评分</option>
        <option val="60">60</option>
        <option val="70">70</option>
        <option val="80">80</option>
        <option val="90">90</option>
        <option val="100">100</option>
      </select>
      <select style="float:left;width:100px;height:30px;margin:7px 0 0 15px;" v-model="param.options.limit">
        <option val="5" disabled>limit</option>
        <option val="2">2</option>
        <option val="10">10</option>
        <option val="15">15</option>
        <option val="20">20</option>
        <option val="30">30</option>
      </select>      
      <checkbox :checkbox="param.options.jd_only" style="margin-top:10px;margin-left:20px" @click="checkbox" />
      只显示京东
      <button class="btn" @click="handleSearch">筛选</button>
    </div>

    <div class="left"><image :src="p" mode="aspectFit" class="img" v-for="(p ,i) in piclist" :key="i"></image></div>
    <div class="right"><Matches :list="matches" index="-1" /></div>
  </div>
</template>

<script>
import Matches from '@/components/Matches/test';
export default {
  components: { Matches },
  data() {
    return {
      list: [],
      static: 'https://markable-china-miniapp.s3.cn-north-1.amazonaws.com.cn/iqiyi/img/',
      uri: 'https://markable-china-miniapp.s3.cn-north-1.amazonaws.com.cn/img/img-file/20190919/3998ac7e6abc5ddc09233ab4da4a4bda.jpg',
      val: '',
      matches: [],
      param: {
        image_uri: 'https://markable-china-miniapp.s3.cn-north-1.amazonaws.com.cn/img/img-file/20190919/3998ac7e6abc5ddc09233ab4da4a4bda.jpg',
        time: '00160',
        video_id: '10029026500',
        options: {
          limit: 5,
          detection_relevance: 60,
          product_relevance: 60,
          jd_only: false
        }
      },
      showpage: true,
      selectTime: [
        { start: '00145', end: '00205', date: '02:42 - 03:42', cc: '00160' },
        { start: '00940', end: '01000', date: '16:07 - 17:07', cc: '00940' },
        { start: '01258', end: '01287', date: '21:37 - 21:45', cc: '01260' },
        { start: '01287', end: '01333', date: '21:45 - 22:22', cc: '01290' },
        { start: '01870', end: '01930', date: '31:17 - 32:17', cc: '01870' },

        { start: '02171', end: '02231', date: '36:18 - 37:18', cc: '02180' },
        { start: '02790', end: '02850', date: '46:50 - 47:50', cc: '02790' },
        { start: '02850', end: '02909', date: '47:50 - 48:48', cc: '02850' },
        { start: '02915', end: '02975', date: '48:58 - 49:58', cc: '02920' },

        { start: '03019', end: '03043', date: '50:32 - 51:12', cc: '03020' },
        { start: '03043', end: '03103', date: '51:12 - 52:12', cc: '03050' },
        // { start: '03103', end: '03130', date: '52:12 - 52:17', cc: '00160' },
        { start: '03130', end: '03195', date: '52:17 - 53:25', cc: '03130' },
        { start: '06455', end: '06515', date: '01:47:58 - 01:48:58', cc: '06460' },
        { start: '06563', end: '06605', date: '01:49:38 - 01:50:08', cc: '06570' }
      ],
      uriList: ['00202','00977','00958', '01264', '01263', '01331', '01315', '01916', '01890', '02228', '02229', '02828', '02835', '02902', '02962',
      '02960', '03042', '03072', '03067', '03120', '03105', '03119', '03176', '06491', '06565', '06581'],
      piclist: []
    };
  },
  onLoad() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        this.showpage = false
        alert('请在MAC 与 PC 的浏览器打开')
      } else {
        let cur = this.selectTime.filter(v => v.cc === this.param.time)
        let sn = Number(cur[0].start)
        let en = Number(cur[0].end)
        let strlist = this.uriList.filter(v => Number(v) >= sn && Number(v) <= en)
        let piclist = []
        strlist.map(v => {
          piclist.push(this.static + this.param.video_id + '.mp4-' + v + '.jpg')
        })
        this.piclist = piclist
        console.log(piclist, 99999)
        this.getImageSearch();
      }
  },
  methods: {
    
    checkbox() {
      this.param.options.jd_only = !this.param.options.jd_only;
    },
    handleSearch() {
      console.log(this.param.time)
      let cur = this.selectTime.filter(v => v.cc === this.param.time)
      let sn = Number(cur[0].start)
      let en = Number(cur[0].end)
      let strlist = this.uriList.filter(v => Number(v) >= sn && Number(v) <= en)
      let piclist = []
      strlist.map(v => {
        piclist.push(this.static + this.param.video_id + '.mp4-' + v + '.jpg')
      })
      this.piclist = piclist
      console.log(piclist, 99999)
      // if (this.param.time.length == 5) {
      //   this.uri = this.static + this.param.videoId + '.mp4-' + this.param.time + '.jpg';
      // } else if (this.param.time.length == 3) {
      //   this.uri = this.static + this.param.videoId + '.mp4-00' + this.param.time + '.jpg';
      // } else if (this.param.time.length == 4) {
      //   this.uri = this.static + this.param.videoId + '.mp4-0' + this.param.time + '.jpg';
      // } else if (this.param.time.length == 2) {
      //   this.uri = this.static + this.param.videoId + '.mp4-00' + this.param.time + '0.jpg';
      // } else if (this.param.time.length == 1) {
      //   this.uri = this.static + this.param.videoId + '.mp4-0000' + this.param.time + '.jpg';
      // }
      // console.log(this.uri);
      // console.log(this.val)
      // if (!this.val) {
      //   alert('请输入正确图片路径 支持 jpg png jpeg!!!')
      //   return false
      // }
      
      // this.uri = this.val
      this.getImageSearch();
    },
    getImageSearch() {
      this.$api
        .getClientSearch({
          data: this.param
          // 'data': {
          //   'image_uri': this.$filter.getCDNtoUri(this.uri),
          //   'image': this.filePath,
          //   'score_method': 'qualityScore', // 排序
          //   'options': {
          //     'auto_detect_gender': true, // 不用打开性别自动识别
          //     'return_specific_nn_match': true, // 返回特定匹配
          //     'unique_products': true // 商品去重
          //   }
          // }
        })
        .then(res => {
          // const { result } = res.data.data
          const data = res.data.data.result;
          console.log(data);
          let renderArr = []; // matches tag arr
          let boundingBoxArr = []; // bounding box arr
          // data.sort(this.$filter.getMatchesSort('bounding_box'))

          data.map((v, idx) => {
            console.log(v.score, '品类分')
            let matchesArr = [];
            // 过滤掉无matches返回种类
            if (v.matches) {
              v.matches.map(m => {
                console.log(m.score, '商品分')
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
                  });
                }
              });
            }
            // 过滤没有matches数组
            if (matchesArr.length > 0) {
              // matches tag render
              renderArr.push({
                index: idx,
                tag: v.category.name ? this.$filter.getChCatalog(v.category.name) : '',
                matches: matchesArr,
                count: matchesArr.length
              });
              // bounding box render
              // boundingBoxArr.push({
              //   index: idx,
              //   zindex: this.$filter.getRandomIndex(v.bounding_box.x, v.bounding_box.y),
              //   x: this.$filter.getToFixed(v.bounding_box.x / imgRatio),
              //   y: this.$filter.getToFixed(v.bounding_box.y / imgRatio),
              //   width: this.$filter.getToFixed(v.bounding_box.width / imgRatio),
              //   height: this.$filter.getToFixed(v.bounding_box.height / imgRatio),
              //   pointX: this.$filter.getPointCenter(v.bounding_box.x / imgRatio, v.bounding_box.width / imgRatio),
              //   pointY: this.$filter.getPointCenter(v.bounding_box.y / imgRatio, v.bounding_box.height / imgRatio)
              // })
            }
          });
          console.log(renderArr, '商品及标签集合');
          // console.log(boundingBoxArr, 'bounding box 集合')
          this.matches = renderArr;
          // this.boundingBox = boundingBoxArr

          // this.getImgStyle() // 获取同款穿搭 在同款结果完成之后进行请求
        })
        .catch(() => {
          // 加载失败
          this.searchApi = false;
        });
    }
  }
};
</script>

<style scoped>
.webview-box {
  width: 100%;
  height: auto;
  /* margin-top:45px; */
  font-size: 12px;
}
.left {
  width: 40%;
  height: auto;
  float: left;
  overflow-y: scroll;
}
.img {
  width: 100%;
  height: 300px;
  display: block;
}
.right {
  width: 60%;
  height: 80vh;
  margin: 0 auto;
  float: left;
  overflow-y: scroll;
}
.form-box {
  width: 60%;
  height: 50px;
  margin: 10px auto;
}
.input {
  width: 20%;
  height: 20px;
  line-height: 20px;
  border: 1px solid #ccc;
  float: left;
  padding: 5px 20px;
  margin-top: 5px;
  border-radius: 10px;
}
.btn {
  width: 20%;
  height: 30px;
  float: left;
  margin-left: 20px;
  margin-top: 7px;
  font-size: 14px;
  line-height: 30px;
}
.scroll-box {
  width: 100%;
  height: 508upx;
  overflow-x: scroll;
  white-space: nowrap;
  box-sizing: border-box;
}
</style>
