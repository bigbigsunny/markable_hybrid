<template>
  <view class="page">
    <!-- <water-fall :list="list"/> -->
    <scroll-view :scroll-y="true" style="height:100vh" 
    :enable-back-to-top="true"
    lower-threshold="100"
    @scrolltolower="loadMore">
      <water-fall :leftList="leftList" :rightList="rightList" />
    </scroll-view>
  </view>
</template>
<script>
  import waterFall from '@/components/WaterFall/main.vue'
  export default {
    components: { waterFall },
    data () {
      return {
        showSkeleton: true,
        skeletonList: [1, 2, 3, 4, 5, 6, 7, 8],
        list: [],
        skip: this.$filter.getRandom(500),
        limit: 10,
        loading: true,
        prevList: [],
        leftList: [],
        rightList: [],
        leftHeight: 0,
        rightHeight: 0
      }
    },
    onLoad () {
      this.getHybridList()
    },
    methods: {
      getHybridList () {
        this.$api.getList({
          limit: this.limit,
          skip: this.skip,
        }).then(res => {
          console.log(res.data.data.result, 32132)
          let data = res.data.data.result
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
          let currentArr = [...this.prevList, ...renderArr]
          let leftH = this.leftHeight
          let rightH = this.rightHeight
          let leftData = this.leftList
          let rightData = this.rightList
          currentArr.map((v, i) => {
            let itemH = v.imgHeight * 0.468
            v.thumbnailHeight = itemH
            if (leftH <= rightH) {
              leftData.push(v)
              leftH += itemH
            } else {
              rightData.push(v)
              rightH += itemH
            }
          })
          console.log(leftH, rightH)
          this.leftList = leftData
          this.rightList = rightData
          this.leftHeight = leftH
          this.rightHeight = rightH          
          // this.list = [...this.prevList, ...renderArr]
        })
      },
      loadMore (e) {
        this.skip+=10;
        this.loading = true;
        this.prevList = this.list
        this.getHybridList();
      }
    }   
  }
</script>

<style scoped>
.skeleton-list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding:0 20upx;
  margin-top:-80upx;
}

.fall{
  width:344upx;
  height:auto;
  margin-top:20upx;
}

.mock-list{
  width:344upx;
  height:344upx;
}

.mock-content{
  width:344upx;
  height:40upx;
  margin-top:20upx;
}

.mock-desc {
  float: left;
  width:280upx;
  height:40upx;
}

.mock-radius {
  float: left;
  width:40upx;
  height:40upx;
  margin-left:20upx;
}
</style>