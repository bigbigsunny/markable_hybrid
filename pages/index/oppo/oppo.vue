<template>
	<view>
		<img v-for="item in list" 
      @click="toPath(item)"
      :src="item" mode="widthFix" 
      style="width:92%;border-radius:10upx;margin:20upx auto 0;display:block;" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
          'http://si1.go2yd.com/get-image/0bGIz7gtQIq',
          'http://si1.go2yd.com/get-image/0bGIzQIkVXM',
          'http://si1.go2yd.com/get-image/0bGIzMIkIsq',
          // 'http://si1.go2yd.com/get-image/0bGIzNbW6Uq',
          'http://si1.go2yd.com/get-image/0bGIzKl89sO',
          'http://si1.go2yd.com/get-image/0bGIzJodqwS',
          'http://si1.go2yd.com/get-image/0bGIzJYLVrM',
          'http://si1.go2yd.com/get-image/0bGIzIL2F3A',
          'http://si1.go2yd.com/get-image/0bGIzGPeRgO',
          'http://si1.go2yd.com/get-image/0bGIzF5PAEC',
          'http://si1.go2yd.com/get-image/0bHb7WVCBV2',
          'http://si1.go2yd.com/get-image/0bHb7ed5DJg',
          'http://si1.go2yd.com/get-image/0bHb7d3S7lI',
          'http://si1.go2yd.com/get-image/0bHb7ZHIfDM',
          'http://si1.go2yd.com/get-image/0bHb7bD1s00',
          'http://si1.go2yd.com/get-image/0bHb7aU4dtI',
          'http://si1.go2yd.com/get-image/0bHb7aBSgDY',
          'http://si1.go2yd.com/get-image/0bHb7aGyImu',
          'http://si1.go2yd.com/get-image/0bIbI6hgkzY',
          'http://si1.go2yd.com/get-image/0bIbICO3Ob2',
          'http://si1.go2yd.com/get-image/0bIbIC2GmPI',
          'http://si1.go2yd.com/get-image/0bIbI9tGHlA',
          'http://si1.go2yd.com/get-image/0bIbIA5UCTg',
          'http://si1.go2yd.com/get-image/0bIbIA2pwO0',
          'http://si1.go2yd.com/get-image/0bIbI9BlpBo',
          ''
        ],
			}
		},
		methods: {
      toPath (row) {
        // let param = btoa(`uri=${row.uri}&api=${row.api}`)
        console.log(row)
        this.$global.navigateTo(`/pages/img/img?uri=${row}&from=h5_oppo`)
      },
		}
	}
</script>

<style>

</style>
