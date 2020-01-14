<template>
  <view class="page">
    <view class="waterfall-box">
    <view class="fall left">
      <view class="col-box" v-for="(item, idx) in leftList" :key="idx"
      @click="toPath(item)">
        <view class="pic-box">
          <image :src="item.thumbnail" 
          lazy-load="true"
          class="pic"
          :style="{height: item.imgHeight * 0.468 + 'px', background: item.color}"></image>
        </view>
        <view class="wall-desc-box">
          <view class="left-content">
            <view class="title omit2">
              <text class="tag">{{item.tag}}</text>
              {{item.desc}}
            </view>
            <view class="info">
              <view class="point"></view>
              <view class="source-item">
                <text class="source-text">麦时尚</text>
                <text class="source-text">{{item.date}}</text>
                <text class="source-text">|</text>
                <text class="source-text">评论（{{item.commentCount || 0}}）</text>
              </view>
            </view>
          </view>
          <view class="right-like" @click.stop="handleLike(idx, 'leftList')">
            <image :src="item.clickLike ? like2 : like1" class="like-icon"/>
            <text class="liked">{{item.likes}}</text>
          </view>
        </view>         
      </view>
    </view>
    <view class="fall right">
      <view class="col-box" v-for="(item, idx) in rightList" :key="idx"
      @click="toPath(item)">
        <view class="pic-box">
          <image :src="item.thumbnail" 
          lazy-load="true"
          class="pic"
          :style="{height: item.imgHeight * 0.468 + 'px', background: item.color}"></image>
        </view>
        <view class="wall-desc-box">
          <view class="left-content">
            <view class="title omit2">
              <text class="tag">{{item.tag}}</text>
              {{item.desc}}
            </view>
            <view class="info">
              <view class="point"></view>
              <view class="source-item">
                <text class="source-text">麦时尚</text>
                <text class="source-text">{{item.date}}</text>
                <text class="source-text">|</text>
                <text class="source-text">评论（{{item.commentCount || 0}}）</text>
              </view>
            </view>
          </view>
          <view class="right-like" @click.stop="handleLike(idx, 'rightList')">
            <image :src="item.clickLike ? like2 : like1" class="like-icon"/>
            <text class="liked">{{item.likes}}</text>
          </view>
        </view>           
      </view>
    </view>    
  </view>
  </view>
</template>

<script>
	export default {
    props: ['leftList', 'rightList'],
		data() {
			return {
				newList: [],
        index: 0,
        mark: 0,
				boxHeight: [],
				top: [], 
				left: [],
        loadingTop: 0,
        like1: '/static/images/like1.png',
        like2: '/static/images/like2.png'        
			}
		},
    mounted () {

    },
		watch: {

		},
		methods: {
      toPath (row) {
        // let param = btoa(`uri=${row.uri}&api=${row.api}`)
        console.log(row.uri)
        this.$global.navigateTo(`/pages/img/img?uri=${row.uri}&api=${row.api}`)
      },
      handleLike (idx, list) {
        if (!this[list][idx].clickLike) {
          this[list][idx].clickLike = true
          this[list][idx].likes += 1
        } else {
          this[list][idx].clickLike = false
          this[list][idx].likes -= 1
        }
        this.$forceUpdate()
      }
		}
	}
</script>

<style scoped>
  .waterfall-box{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top:16upx;
  }

  .fall{
    width:351upx;
    height:auto;
  }
  .col-box{
    width:100%;
    height:auto;
    margin-bottom:16upx;
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.06);
    position: relative;
  }
  .left{
    margin-right:16upx;
  }
  .pic{
    width:100%;
    display: block;
    border-top-left-radius: 8upx;
    border-top-right-radius: 8upx;
  }  
  .wall-desc-box{
    width:100%;
    height:128upx;
    background: #fff;
  }
  .left-content{
    width:248upx;
    height:auto;
    padding:12upx 0 0 16upx;
    float: left;
  }
  .title{
    width:248upx;
    height:60upx;
    font-size: 22upx;
    margin-top:8upx;
    font-family: PingFangSC-Semibold, sans-serif;
  }
  .tag{
    color:#A255FB;
  }
  .info{
    width:100%;
    height:30upx;
    /* background: #00f; */
    margin-top:8upx;
  }
  .point{
    width:16upx;
    height:16upx;
    border-radius: 50%;
    background: #F8BA03;
    float: left;
    margin:12upx 4upx 0 0;
  }
  .source-item{
    width:auto;
    height:30upx;
    line-height: 30upx;
  }
  .source-text{
    margin-right:6upx;
    font-size: 16upx;
  }
  .right-like{
    float: right;
    width:60upx;
    height:auto;
    margin: 28upx 15upx 0 0;
    /* background: #00f; */
  }
  .like-icon{
    width:40upx;
    height:32upx;
    display: block;
    margin:0 auto;
  }
  .liked{
    font-size: 18upx;
    color: #606060;
    text-align: center;
    display: block;
    margin-top:10upx;
  }
  .shop-box{
    position: absolute;
    top:0;
    right:0;
    width:64upx;
    height:52upx;
    background: #fff;
    /* box-shadow:0px 2px -6px 0px rgba(0,0,0,0.6) */
    box-shadow:-2px 2px 6px rgba(0,0,0,0.6);
  }
  .shop-img{
    width:30upx;
    height:30upx;
    display: block;
    margin:11upx 6upx;
    float: left;
  }
  .shop-num{
    line-height: 60upx;
    font-size: 16upx;
    color: #A255FB;
    float: left;
  }  
</style>
