<template>
  <view class="loading-box">
    <view v-if="status == 'error'">
      <image src="/static/images/errloading.gif" class="loading-img" mode="widthFix"></image>
      <view class="loading-tips">加载失败了QAQ...</view>
      <view class="btn" @click="reload">重新加载</view>
    </view>
    <view v-else>
      <image src="/static/images/loading.gif" class="loading-img" mode="widthFix"></image>
      <view class="loading-tips">小麦正努力加载中</view>      
    </view>
  </view>
</template>

<script>
  export default {
    name: 'loading',
    props: ['status'],
    data () {
      return {
        
      }
    },
    methods: {
      reload () {
        this.$emit('reload', true)
      }
    }
  }
</script>

<style scoped>
  .loading-box{
    width:100%;
    height:auto;
  }
  .loading-img{
    width:90upx;
    height:auto;
    display: block;
    margin:0 auto;
  }
  .loading-tips{
    width:100%;
    height:50upx;
    line-height: 50upx;
    color: #999;
    font-size: 24upx;
    text-align: center;
  }
  .btn{
    width:200rpx;
    height:60rpx;
    border-radius: 40rpx;
    text-align: center;
    line-height: 60rpx;
    font-size: 26rpx;
    border:1rpx solid #ccc;
    color:#999;
    margin:30rpx auto;
  }  
</style>
