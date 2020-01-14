<template>
  <view class="flow-box" :style="'height: ' + loadingTop + 'px'">
    <view class="item"
    v-for="(item, idx) in newList" :key="idx"
    :style="'top:' + top[idx] + 'px;'"
    :class="left[idx] == 1 ? 'left' : ''"
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
        <view class="right-like" @click.stop="handleLike(idx)">
          <image :src="item.clickLike ? like2 : like1" class="like-icon"/>
          <text class="liked">{{item.likes}}</text>
        </view>
      </view>  
    </view>
  </view>
</template>

<script>
  import md5 from '@/utils/md5.js'
	export default {
    props: ['list', 'change'],
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
      // 固定数组
      if (this.change) {
        console.log('相关穿搭waterfall')
        this.mark = 0
        this.newList = this.list
        this.$nextTick(function () {
          setTimeout(() => {
            this.waterFall()
          }, 120)
        })        
      }      
    },
		watch: {
			// 数据
			list: function (newVal, oldVal) {
        // flow
        if (!this.change) {
          console.log('更多穿搭waterfall')
          this.mark = oldVal.length
          if (newVal != oldVal) {
            this.newList = this.list
            this.$nextTick(function () {
              setTimeout(() => {
                this.waterFall()
              }, 120)
            })
          }          
        }
			}
		},
		methods: {
      toPath (row) {
        // let param = btoa(`uri=${row.uri}&api=${row.api}`)
        this.$global.navigateTo(`/pages/img/img?uri=${row.uri}&api=${row.api}`)
      },
      handleLike (idx) {
        if (!this.list[idx].clickLike) {
          this.newList[idx].clickLike = true
          this.newList[idx].likes += 1
        } else {
          this.newList[idx].clickLike = false
          this.newList[idx].likes -= 1
        }
        this.$forceUpdate()
      },      
			// 瀑布流定位
			waterFall() {
        const query = uni.createSelectorQuery().in(this)
        query.selectAll('.flow-box .item').boundingClientRect(res => {
          let len = this.newList.length // 当前数组个数
          let height = 0
          for (let i = this.mark; i < len; i++) {
            height = res[i].height
						if (i < 2) {
							this.$set(this.newList[i], 'top', 0);
							this.$set(this.newList[i], 'left', i);
							this.boxHeight.push(height);
							this.top.push(0);
							this.left.push(i);
						} else {
							let minHeight = this.boxHeight[0];
							let index = 0;
							if (minHeight > this.boxHeight[1]) {
								minHeight = this.boxHeight[1];
								index = 1;
							}
							this.boxHeight[index] = minHeight + height + 8;
							this.top.push(minHeight + 8);
							this.left.push(index);
							this.$set(this.newList[i], 'top', minHeight + 8);
							this.$set(this.newList[i], 'left', index);
							this.loadingTop = this.boxHeight[index];
						}            
          }
        }).exec()
			}
		}
	}
</script>

<style scoped>
	.flow-box {
		position: relative;
		color: #1a1a1a;
		padding-bottom: var(--window-bottom);
    margin-top:16upx;
	}
	.flow-box .item {
		position: absolute;
		left: 16upx;
		/* width: calc(50% - 32upx); */
    width:351upx;
		/* border: 1upx solid #f9f9f9; */
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
    border-radius: 5upx;
	}
	.flow-box .left {
		left: 383upx;
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
