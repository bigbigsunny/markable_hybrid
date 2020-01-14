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
        // console.log(this.$filter.transUrl(decodeURIComponent(url), id, this.from))
        window.location.href = this.$filter.transUrl(decodeURIComponent(url), id, this.from)
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
    height:20px;
    line-height: 20px;
    font-size: 13px;
    color: #525252;
    padding:15px 0 10px 0;
    font-weight:bold;
    display: block;
  }
  .scroll-box{
    width:100%;
    height:254px;
    overflow-x: scroll;  
    white-space: nowrap;  
    box-sizing: border-box;
  }
  .card-box{
    width:142px;
    height:250px;
    background: #fff;
    box-shadow:0px 1px 3px 0px rgba(0,0,0,0.06);
    border-bottom:4px solid #727272;
    border-radius: 5px;
    margin-right:6px;
    display:inline-block;
    white-space: normal;
    overflow: hidden;
    vertical-align: middle;    
  }
  .img-card{
    width:142px;
    height:173px;
    position: relative;
    border-bottom:1px solid #dfdfdf;
  }  
  .img{
    width:100%;
    height:100%;
    border-top-right-radius: 5rpx;
    border-top-left-radius: 5rpx;
  }  
  .desc-box{
    width:125px;
    height:65px;
    padding: 7px 10px 3px;
  }
  .title{
    width:100%;
    height:30px;
    font-size: 11px;
    color: #5e5e5e;
    line-height: 16px;
    font-family: PingFangSC-Semibold, sans-serif;
    margin-bottom:3px;
  }
  
  .vendor{
    width:100%;
    height:14px;
    font-size: 10px;
    line-height: 14px;
    color: #777;
    margin-bottom: 2px;
  }
  
  .bottom{
    width: 100%;
    height:17px;
    line-height: 17px;
  }
  .price{
    width:auto;
    height:17px;
    line-height: 17px;
    color:#AB3434;
    font-size: 12px;
    float: left;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .currency{
    font-size: 10px;
  }
  .source-box{
    float:right;
    width:auto;
    height:13.5px;
    line-height: 13.5px;
    padding: 0px 4px;
    margin-top:2px;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .source-name{
    font-size: 9px;
    float: right;
    margin-right:3px;
  }
 .source-point{
    border-radius: 50%;
    width:8px;
    height:8px;
    float: right;
    /*#ifdef H5*/
      margin:3px -2px 0 0;
    /*#endif*/
    margin:3px -2px 0 0;
  }
  .sale-icon{
    position: absolute;
    right:0;
    top:0;
    width: 30px;
    height:auto;
    display: block;
    z-index: 99;
  }
</style>
