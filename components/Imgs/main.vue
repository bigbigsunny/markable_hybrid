<template>
  <view class="imgs-box bg-img" :style="{height: height + 'px'}">
   <Magic v-if="showMagic"/>
   <!--#ifdef H5-->
   <block>
     <image class="img" mode="widthFix" :src="thumbnail" v-show="showThumbnail" @click="handlePoint({index: -1})"></image>
     <image class="img" mode="widthFix" :src="uri" v-show="!showThumbnail" @click="handlePoint({index: -1})"
     @load="imgLoad" @error="imgErr"></image>
   </block>
   <!--#endif-->
   <!--#ifdef APP-PLUS-->
    <image class="img" mode="aspectFit" :src="uri" @click="handlePoint({index: -1})"></image>
   <!--#endif-->
   <view v-for="(item, idx) in box" :key="idx">
     <view class="point-box animate small" 
     v-if="item.width < 100 && item.height < 100"
     @click="handlePoint(item)"
     :style="{top: item.pointY + 'px', 
              left: item.pointX + 'px',
              width: (cur.index === item.index ? cur.width + 'px' : ''), 
              height: (cur.index === item.index ? cur.height + 'px' : ''),
              'margin-top': (cur.index === item.index ? '-' + cur.height / 2 + 'px' : ''),
              'margin-left': (cur.index === item.index ? '-' + cur.width / 2 + 'px' : ''),
              border: (cur.index === item.index ? '1px solid #fff': ''),
              'border-radius': (cur.index === item.index ? '2px': ''),
              'z-index':(cur.index === item.index ? '1': ''),
              'box-shadow': (cur.index === item.index ? '0 0 0 2000px rgba(0,0,0,.6)': '')}">
       <image src="/static/images/point.png" class="point-img"
       v-show="cur.index !== item.index"></image>
     </view>
     <view class="point-box animate big" 
     v-else
     @click="handlePoint(item)"
     :style="{top: item.pointY + 'px', 
              left: item.pointX + 'px',
              width: (cur.index === item.index ? cur.width + 'px' : ''), 
              height: (cur.index === item.index ? cur.height + 'px' : ''),
              'margin-top': (cur.index === item.index ? '-' + cur.height / 2 + 'px' : ''),
              'margin-left': (cur.index === item.index ? '-' + cur.width / 2 + 'px' : ''),
              border: (cur.index === item.index ? '1px solid #fff': ''),
              'z-index':(cur.index === item.index ? '1': ''),
              'border-radius': (cur.index === item.index ? '10px': ''),
              'box-shadow': (cur.index === item.index ? '0 0 0 2000px rgba(0,0,0,.6)': '')}">
       <image src="/static/images/point.png" class="point-img"
       v-show="cur.index !== item.index"></image>
     </view>     
   </view>
  </view>
</template>

<script>
  import Magic from '@/components/Magic/main'
  export default {
    name: 'imgs',
    props: ['uri', 'height', 'box', 'thumbnail'],
    components: { Magic },
    data () {
      return {
        showMagic: true,
        showThumbnail: true,
        cur: {} // 当前选中point 
      }
    },
    onLoad () {
      this.resetData()
    },
    methods: {
      resetData () {
        this.showThumbnail = true
        this.cur = {}
        this.showMagic = true
      },
      handlePoint (row) {
        this.cur = row
        this.$emit('checkPoint', row.index)
      },
      imgLoad () {
        this.showThumbnail = false
        setTimeout(() => {
          this.showMagic = false
        }, 1500)
      },
      imgErr () {
        this.thumbnail = this.$filter.getThumbnail(this.uri, 800)
        setTimeout(() => {
          this.showMagic = false
        }, 1500)        
      }
    }
  }
</script>

<style scoped>
	.imgs-box{
		width:100%;
		height:auto;
    position: relative;
	}
	.img{
		display: block;
		width:100%;
		height:100%;
	}
  .mask{
    width:100%;
    position: absolute;
    left:0;
    top:0;
    bottom: 0;
    opacity: 0.6;
    background: #000;
    color:#000;
    z-index: 3;
  }
  
  .popopu{
    position: fixed;
    width: 200px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 10;
    border-radius: 10px;
    border: 1px solid #ffffff;
    box-shadow: 0 0 0 2000px rgba(0,0,0,.6)
  }  
  .point-box{
    position: absolute;
    left:50%;
    top:50%;
    z-index: 100;
  }
  .big{
    width: 60rpx;
    height:60rpx;  
    margin:-30rpx 0 0 -30rpx;
  }
  .small{
    width: 40rpx;
    height:40rpx;  
    margin:-20rpx 0 0 -20rpx;
  }  
  .point-img{
    width:100%;
    height:100%;
    border-radius: 50%;
  }
  .animate{
    transition:all .3s;
    border-radius: 50%;
  }  
</style>
