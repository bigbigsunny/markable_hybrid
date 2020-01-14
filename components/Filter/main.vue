<template>
  <view class="popup-content" @touchmove.stop.prevent="moveHandle">
    <view class="title-item">
      <view class="title-h3">选择来源</view>
      <image src="/static/images/cancel.png" class="cancel" @click="handleClose"/>
    </view>
    <view class="icon-list">
      <view class="icon-item" v-for="(item, idx) in list" :key="idx"
      @click="handleCheck(item)">
        <image :src="'/static/images/'+ item.vendor +'-icon.png'" class="icons"/>
        <view class="icon-name">
          <text>{{item.name}}</text>
          <block>
            <image src="/static/images/filter2.png" class="check" v-show="item.check"/>
            <image src="/static/images/filter1.png" class="check" v-show="!item.check"/>
          </block>
        </view>
      </view>
      <view class="clear"></view>
    </view>
    <view class="btn-box">
      <view class="btn-reset" @click="handleReset">重置</view>
      <view class="btn-confirm" @click="handleConfirm">确定</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'popup-filter',
    props: ['check'],
    data () {
      return {
        list: [
          {id: 0, name: '唯品会', vendor: 'vip', check: true},
          {id: 1, name: 'Farfetch中国', vendor: 'farfetch', check: true},
          {id: 2, name: '天猫', vendor: 'tmall', check: true},
          {id: 3, name: '京东', vendor: 'jd', check: true},
          {id: 4, name: '拼多多', vendor: 'pdd', check: true},
          {id: 5, name: 'MAI海淘', vendor: 'mai', check: true},
          {id: 6, name: '亚马逊', vendor: 'amazon', check: true},
          // {id: 7, name: 'Revolve', vendor: 'revolve', check: true},
          // {id: 8, name: 'Forward', vendor: 'forward', check: true}          
        ],
        checkList: [0, 1, 2, 3, 4, 5, 6]
      }
    },
    onShow () {
      console.log(321321)
    },
    mounted () {
      const tempList = this.list
      tempList.map(l => {
        l.check = false
        this.check.map(v => {
          if (l.id == v) {
            l.check = true
          }
        })
      })
      this.list = tempList
      this.$forceUpdate()
    },
    methods: {
      moveHandle () {},
      // 点击重置
      handleReset () {
        this.list.map(v => {
          v.check = false
        })
      },      
      // 点击关闭按钮
      handleClose () {
        this.$emit('changeStatus', false)
      },
      // 筛选
      handleCheck (row) {
        this.list[row.id].check = !this.list[row.id].check
      },
      // 点击确定
      handleConfirm () {
        let chooseArr = []
        this.list.map(v => {
          if (v.check) {
            chooseArr.push(v.id)
          }
        })
        this.$emit('changeStatus', chooseArr)
      },      
    }
  } 
</script>

<style scoped>
  .popup-content{
    width:100%;
    height:auto;
    background:#f7f7f7;
    border-radius: 20upx;
  }
  .title-item{
    width:100%;
    height:50upx;
    line-height: 50upx;
    font-size: 28upx;
    color: #525252;
    padding:30upx 0 0 0;
  }
  .title-h3{
    float: left;
    margin-left:24upx;
  }
  .cancel{
    width:24upx;
    height:24upx;
    float: right;
    margin-right:24upx;
    margin-top:8upx;
  }
  .icon-list{
    width:100%;
    height:auto;
    clear: both;
    /* display: flex; */
  }
  .icon-item:nth-child(2) > img{
    border:1upx solid #a8a8a8;
  }

  .btn-box{
    width:92%;
    height:70upx;
    padding:70upx 24upx;
    display: flex;
    justify-content: space-between
  }

  .btn-box > view{
    width:240upx;
    height:70upx;
    line-height: 70upx;
    font-size: 28upx;
    text-align: center;
    border-radius: 8upx;
  }

  .btn-reset{
    width:236upx !important;
    height:66upx !important;
    line-height: 66upx;
    color:#7B41D1;
    border:4upx solid #7B41D1
  }

  .btn-confirm{
    background: #7B41D1;
    color: #fff;
  }

  .icon-item{
    width:25%;
    height:153upx;
    /* background: #0f0; */
    margin-top:48upx;
    float: left;
  }
  .icons{
    width:106upx;
    height:106upx;
    border-radius: 50%;
    display: block;
    margin:0 auto;
  }

  .icon-name{
    width:100%;
    height:28upx;
    line-height: 28upx;
    font-size: 20upx;
    color:#000;
    margin-top:14upx;
    text-align: center;
  }
  .check{
    width:20upx;
    height:20upx;
    margin-left:12upx;
  }
</style>
