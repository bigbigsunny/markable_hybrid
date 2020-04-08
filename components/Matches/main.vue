<template>
  <view class="matches-box">
    <view v-for="(item, index) in list" :key="index" v-show="idx == -1 || item.index == idx">
      <text class="h3">{{item.tag}}</text>
      <scroll-view class="scroll-box" scroll-x v-if="item.count && item.count > 0">
        <view class="card-box" v-for="(child, idx) in item.matches" :key="idx"
        @click="toPath(child.shoplink, child.source.id)"
        v-show="child.show" v-if="!child.error">
          <view class="img-card img-bg">
            <image src="/static/images/temai.png" mode="widthFix" class="sale-icon" v-if="child.source.id == 0"></image>
            <image :src="child.thumbnail" class="img"  
            :mode="child.source.id == 6 || child.source.id == 5 ? 'aspectFit' : 'aspectFill'" :lazy-load="true" @error="imgErr(index, idx)"></image>
          </view>
          <view class="desc-box">
            <view class="title omit2">{{child.name}}</view>
            <view class="vendor omit1">{{child.brand}}</view>
            <view class="bottom">
              <view class="price">
                <text class="currency">{{child.currency}}</text>{{child.source.id == 4 ? child.price / 100 : child.price}}
                <!-- <text>{{child.brand}}</text> -->
              </view>
              <view class="source-box">
                <view :style="{background: child.source.bg}" class="source-point"></view>
                <view class="source-name"  :style="{color: child.source.bg}">{{child.source.name}}</view>
              </view>
            </view>
          </view>          
        </view>
      </scroll-view>
      <Default v-else/>
    </view>
  </view>
</template>

<script>
  import Default from '@/components/Default/main'
  export default {
    name: 'matches',
    props: ['list', 'index', 'from'],
    components: { Default },
    data () {
      return {
        idx: -1,
      }
    },
    watch: {
      index (val) {
        console.log(val)
        this.idx = val
      }
    },    
    onLoad (options) {
    },
    methods: {
      imgErr (p, c) {
        this.$set(this.list[p].matches[c], 'error', true)
      },      
      toPath (url, id) {
        // #ifdef H5
        console.log(decodeURIComponent(url))
        console.log(this.$filter.transUrl(decodeURIComponent(url), id, this.from))
        // window.location.href = this.$filter.transUrl(decodeURIComponent(url), id, this.from)
        // #endif
        // #ifdef APP-PLUS
        plus.runtime.openURL(decodeURIComponent(url))
        // #endif
      }
    }
  }
</script>

<style scoped>
  .h3{
    width:100%;
    height:40upx;
    line-height: 40upx;
    font-size: 26upx;
    color: #525252;
    padding:30upx 0 20upx 0;
    font-weight:bold;
    display: block;
  }
  .scroll-box{
    width:100%;
    height:508upx;
    overflow-x: scroll;  
    white-space: nowrap;  
    box-sizing: border-box;
  }
  .card-box{
    width:284upx;
    height:500upx;
    background: #fff;
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.06);
    border-bottom:8upx solid #727272;
    border-radius: 10upx;
    margin-right:12upx;
    display:inline-block;
    white-space: normal;
    overflow: hidden;
    vertical-align: middle;    
  }
  .img-card{
    width:284upx;
    height:346upx;
    position: relative;
    border-bottom:1upx solid #dfdfdf;
  }  
  .img{
    width:100%;
    height:100%;
    border-top-right-radius: 10rpx;
    border-top-left-radius: 10rpx;
  }  
  .desc-box{
    width:250upx;
    height:130upx;
    padding: 14upx 20upx 6upx;
  }
  .title{
    width:100%;
    height:60upx;
    font-size: 22upx;
    color: #5e5e5e;
    line-height: 32upx;
    font-family: PingFangSC-Semibold, sans-serif;
    margin-bottom:5upx;
  }
  
  .vendor{
    width:100%;
    height:28upx;
    font-size: 20upx;
    line-height: 28upx;
    color: #777;
    margin-bottom: 3upx;
  }
  
  .bottom{
    width: 100%;
    height:34upx;
    line-height: 34upx;
  }
  .price{
    width:auto;
    height:34upx;
    line-height: 34upx;
    color:#AB3434;
    font-size: 24upx;
    float: left;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .currency{
    font-size: 20upx;
  }
  .source-box{
    float:right;
    width:auto;
    height:27upx;
    line-height: 27upx;
    padding: 0upx 8upx;
    margin-top:4upx;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .source-name{
    font-size: 18upx;
    float: right;
    margin-right:6upx;
  }
 .source-point{
    border-radius: 50%;
    width:16upx;
    height:16upx;
    float: right;
    /*#ifdef H5*/
      margin:6upx -5upx 0 0;
    /*#endif*/
    margin:6upx -5upx 0 0;
  }
  .sale-icon{
    position: absolute;
    right:0;
    top:0;
    width: 60upx;
    height:auto;
    display: block;
    z-index: 99;
  }
</style>
