import global from '@/utils/global.js'
import CDN from '@/utils/cdn.js'
import CONFIG from '@/config/config.js'
// 随机背景
const randomBgColor = function (idx) {
  let colorList = ['DCF4F5', 'ACE0DD', 'FA6690', 'FEC0CF', 'FEEBF2', 'AE7F6C',
    'B6DCB6', 'D2E9E1', 'FBEDC9', 'F8DDA9', 'FCB6D0', 'FFDEE1',
    'FFD6DA', 'FFC6D0', 'E1F7F7', 'D1FAF5', 'C3D6F2', '789CCE',
    'F6D7C3', 'ACBFEA', 'C8D5F6', 'FED7DD', 'FFC5CE', 'FFACBB']
  if (idx > colorList.length - 1) {
    idx = idx % colorList.length
  }
  return `#${colorList[idx]}`
}
// 随机排序
const randomSort = function (arr) {
  arr.sort(function () {
    return 50 - (Math.random() * 100)
  })
  return arr
}
// 去掉逗号
const getNumber = function (str) {
  return Number(str.replace(',', ''))
}
// 缩略图规则
const getThumbnail = function (uri, size = 400) {
  size = `${size}x${size}`
  return `${CONFIG.HOST_CDN}/resize/${size}/${uri}`
}
// 阿里云图片裁切 video poster
const getAliImgSize = function (uri) {
  if (uri.indexOf('w_0') > -1) {
    return uri.replace('w_0', 'w_300')
  } else {
    return uri
  }
}
// 获取月日
const getDate = function (date) {
  let d = date.split('T')[0]
  let arr = d.split('-')
  return `${arr[1]}-${arr[2]}`
}
// 获取年月日
const getYMD = function () {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}
// 设置随机数
const getRandom = function (num = 9999) {
  return Math.ceil(Math.random() * num)
}

// 根据宽高比例 获取图片高度
const getRatioHeight = function (width, height) {
  const wh = global.getSystemInfo('windowWidth')
  const ratio = Number(wh / width)
  return ratio * height
}

// 获取图片相对于屏幕比例
const getImgRatio = function (width = 1080) {
  global.getSystemInfo('windowWidth')
  return width / global.getSystemInfo('windowWidth')
}

// 获取小数点后2位
const getToFixed = function (num) {
  return num.toFixed(2)
}

// 获取随机层级
const getRandomIndex = function (x, y) {
  let num = 1000000 / (x * y)
  return num.toFixed(0)
}

// 根据区域获得中心点坐标
const getPointCenter = function (x, w) {
  return x + (w / 2)
}
// 货币符号转化
const getCurrency = function (flag) {
  if (flag === 'CNY' || !flag) { // 中文
    return '￥'
  } else if (flag === 'USD') {
    return '$'
  } else {
    return flag
  }
}
// 电商来源
const getShopSource = function (name) {
  if (name.indexOf('vip') > -1) {
    return {id: 0, name: '唯品会', bg: 'rgba(241,1,128,1)', appid: 'wxe9714e742209d35f'}
  } else if (name.indexOf('farfetch') > -1) {
    return {id: 1, name: 'Farfetch中国', bg: '#E8C28C', appid: 'wxb3959dd9f45a8c2d'}
  } else if (name.indexOf('tmall') > -1) {
    return {id: 2, name: '天猫', bg: 'rgba(196,0,0,1)', appid: ''}
  } else if (name.indexOf('jd') > -1) {
    return {id: 3, name: '京东', bg: 'rgba(201,22,35,1)', appid: 'wx1edf489cb248852c'}
  } else if (name.indexOf('pinduoduo') > -1) {
    return {id: 4, name: '拼多多', bg: 'rgba(224,46,36,1)', appid: 'wx32540bd863b27570'}
  }  else if (name.indexOf('amazon') > -1) { // 亚马逊
    return {id: 6, name: '亚马逊', bg: '#fb8100', appid: 'wx3265fbb010daacc5'}
  } else { // 海淘
    if (name.indexOf('bloomingdales') > -1) {
      return {id: 5, name: 'Bloomingdales', bg: 'rgb(43,43,43)', appid: ''}
    } else if (name.indexOf('loft') > -1) {
      return {id: 5, name: 'Loft', bg: 'rgb(254,205,226)', appid: ''}
    } else if (name.indexOf('country') > -1) {
      return {id: 5, name: 'Hat Country', bg: 'rgb(248,107,105)', appid: ''}
    } else if (name.indexOf('mclabels') > -1) {
      return {id: 5, name: 'McLabels', bg: 'rgb(195,45,104)', appid: ''}
    } else if (name.indexOf('taylor') > -1) {
      return {id: 5, name: 'Ann Taylor', bg: 'rgb(43,43,43)', appid: ''}
    } else if (name.indexOf('ssense-global') > -1) {
      return {id: 5, name: 'Ssense Global', bg: 'rgb(135,1,215)', appid: ''}
    } else if (name.indexOf('warehouse') > -1) {
      return {id: 5, name: "Men's Warehouse", bg: 'rgb(0,40,73)', appid: ''}
    } else if (name.indexOf('smartbuyglasses') > -1) {
      return {id: 5, name: 'Smartbuyglasses', bg: 'rgb(239,156,55)', appid: ''}
    } else if (name.indexOf('splendid') > -1) {
      return {id: 5, name: 'Splendid', bg: 'rgb(5,16,67)', appid: ''}
    } else if (name.indexOf('shopbop-au-') > -1) {
      return {id: 5, name: 'Shopbop', bg: 'rgb(134,53,72)', appid: ''}
    } else if (name.indexOf('bloomingdales-canada') > -1) {
      return {id: 5, name: 'Bloomingdales Canada', bg: 'rgb(43,43,43)', appid: ''}
    } else if (name.indexOf('catherines') > -1) {
      return {id: 5, name: "Catherine's", bg: 'rgb(27,59,98)', appid: ''}
    } else if (name.indexOf('revolve') > -1) { // revolve
      return {id: 5, name: 'Revolve', bg: 'rgba(0,0,0,1)', appid: ''}
    } else {
      return {id: 5, name: name.split('-')[1], bg: '#ccc', appid: ''}
    }
  }
}

// 根据api转换对应的name
const getApiName = function (api) {
  if (api === 'getWomenList') { // 欧美女性
    return 'catalog-style-women'
  } else if (api === 'getMenList') { // 欧美男性
    return 'catalog-style-men'
  } else if (api === 'getAsianList') { // 亚洲男女
    return 'catalog-style-asian-celebrities'
  }
}

const getNameTransApi = function (name) {
  if (name.indexOf('catalog-style-women') > -1) { // 欧美女性
    return 'getWomenList'
  } else if (name.indexOf('catalog-style-men') > -1) { // 欧美男性
    return 'getMenList'
  } else if (name.indexOf('catalog-style-asian-celebrities') > -1) { // 亚洲男女
    return 'getAsianList'
  }
}


// 返回数据的特殊字符转换
const decodeUnicode = function (str) {
  let strTrim = str.trim().replace(/\n/g, '')
  strTrim.replace(/u000A/g, '')
  strTrim.replace(/u000D/g, '')
  strTrim.replace(/u2028/g, '')
  strTrim.replace(/u2029/g, '')
  return JSON.parse(strTrim)
}

// cdn 转链
const getCDNtoUri = function (uri) {
  return CDN.CDNtoUri(uri)
}
// 获取区间随机数
const getRandomScope = function (m, n) {
  let num = Math.floor(Math.random() * (m - n) + n)
  return num
}
// 按照面积进行排序
const getMatchesSort = function (key) {
  return function (value1, value2) {
    var val1 = value1[key].width * value1[key].height
    var val2 = value2[key].width * value2[key].height
    return val2 - val1
  }
}

const getSort = function (key) {
  return function (value1, value2) {
    return value2 - value1
  }
}

const transUrl = function (url, id, froms) {
  if (id === 0) { // 唯品会
    if (url.indexOf('?') > -1) {
      return `${url}&chan=${froms}`
    } else {
      return `${url}?chan=${froms}`
    }
  } else if (id === 1) { // farfetch
    if (url.indexOf('?') > -1) {
      return `${url}&pubref=${froms}`
    } else {
      return `${url}?pubref=${froms}`
    }
  } else if (id === 6) { // 亚马逊
    let flag = 'mai2019-23' 
    if (froms.indexOf('oppo') > -1) {
      flag = 'oppokol2020-23'
    }
    if (url.indexOf('?') > -1) {
      return `${url}&tag=${flag}`
    } else {
      return `${url}?tag=${flag}`
    }
  } else if (id === 7 || id === 8) { //CJ (revelve forward)
    if (url.indexOf('?') > -1) {
      return `${url}&sid=${froms}`
    } else {
      return `${url}?sid=${froms}`
    }
  } else {
    return url
  }
}

// 图片裁剪 目前用于海报
const CanvasCilpPic = function (ctx, x, y, w, h, r, c = '#fff') {
  if (w < 2 * r) { r = w / 2 }
  if (h < 2 * r) { r = h / 2 }

  ctx.beginPath()
  ctx.fillStyle = c

  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.lineTo(x + w, y + r)

  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
  ctx.lineTo(x + w, y + h - r)
  ctx.lineTo(x + w - r, y + h)

  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
  ctx.lineTo(x + r, y + h)
  ctx.lineTo(x, y + h - r)

  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
  ctx.lineTo(x, y + r)
  ctx.lineTo(x + r, y)

  ctx.fill()
  ctx.closePath()
}

/* eslint-disable */
// catalog 英译汉
const getChCatalog = function (en) {
  const obj = {
    hoodies: "帽衫",
    shoes: "鞋",
    messengerbags: "斜挎包",
    jeans: "牛仔裤",
    tunics: "长上衣",
    coats_jackets: "外套",
    suiting_blazers: "正装",
    sweater: "毛衣",
    tees: "T恤",
    tanks_camis: "背心",
    blouses_shirts: "上衣",
    pants: "裤子",
    shorts: "短裤",
    skirts: "半身裙",
    slippers: "拖鞋",
    leggings: "紧身裤",
    dresses: "连衣裙",
    bucket: "水桶包",
    jumpsuits_rompers_overalls: "连衣裤",
    handbags: "手提包",
    clutches: "手包",
    belts: "皮带",
    boots: "靴子",
    sandals: "凉鞋",
    glasses: "眼镜",
    beanieknitcaps: "编织帽",
    cowboyhats: "牛仔帽",
    scarves_wraps: "围巾",
    totes: "单肩包",
    watches: "手表",
    jumpsuits: '连体衣',
    backpacks: "背包",
    baseballcaps: "棒球帽",
    berets: "贝雷帽",
    blouses: "女式衬衫",
    buttondowns: "领扣衬衫",
    cardigans: "开襟羊毛衫",
    clutches: "手包",
    henleys: "套衫",
    jumpsuits: "连衣裤",
    longsleeveshirts: "长袖衬衫",
    overalls: "工装裤",
    polos: "Polo衫",
    rompers: "连体短裤",
    suitcoats_blazers: "西装外套",
    sunhats_cowboyhats: "阔边太阳帽",
    sweaters: "毛衣",
    ties: "领带",
    vests: "背心",    
  }
  let chName = obj[en]
  if (!chName) {
    chName = en
  }
  return chName
}

// 分享随机文案
const getShareMsg = function () {
  const arr = [
    "MAI为你精选了海量明星同款穿搭，快来看看吧",
    "明星私服在这找，还有更多穿搭攻略",
    "高性价比多电商平台明星私服，你想要的MAI都能给你",
    "还在为穿什么而苦恼？MAI已经为您设计好了",
    "精选明星私服，拒绝垃圾商品，期待你的加入",
    "搜图、挑选、穿搭、省钱？MAI都为你考虑到了",
    "电商平台一个一个对比？选MAI就够了，所有平台都在这",
    "爱美的人都在用MAI，为你定制推介海量明星穿搭",
    "选衣服找穿搭，你还不知道MAI就太low了",
    "在MAI，只有你想不到的，没有你买不到的",
    "不懂怎么穿搭，MAI告诉你",
    "选择MAI，你就离时尚更近了一步",
    "穿衣太土没自信？MAI期待和你一起改变",
    "MAI，每个人的穿搭圣经，海量穿搭供你挑选",
    "没用MAI之前，我不懂什么叫做时尚",
    "你不知道的潮流搭配都在这里，进来自行种草吧",
    "想看明星“带货王”怎么穿？点我就对了",
    "来MAI，给你明星般的穿搭设计",
    "女明星们都在穿的单品，你确定不来一件",
    "新生代人气小花也爱的潮品，尽在MAI",
    "明星私服穿搭，快戳这里，把它们收入囊中",
    "用MAI，轻松get潮人同款",
    "OMG！和明星撞衫啦？今夏潮流单品一起来get",
    "这几款爱豆同款，你更喜欢哪一个",
    "今夏大热达人同款单品，买它！！！",
    "明星同款穿搭，谁还不是活力小公举呀",
    "学她机场随性搭配，你也变身时髦精",
    "穿上这件达人同款，聚会轻松秒杀全场",
    "明星同款T恤！允许你没有！不允许你不知道",
    "如果你也有对穿搭的不懈追求，那么选择MAI吧"
  ]
  return arr[Math.floor((Math.random() * arr.length))]
}
export default {
  randomBgColor,
  randomSort,
  getThumbnail,
  getDate,
  getRandom,
  getShareMsg,
  getRatioHeight,
  getChCatalog,
  getImgRatio,
  getToFixed,
  getRandomIndex,
  getPointCenter,
  getApiName,
  getCurrency,
  getShopSource,
  decodeUnicode,
  getAliImgSize,
  getNumber,
  getCDNtoUri,
  getRandomScope,
  getMatchesSort,
  getYMD,
  CanvasCilpPic,
  getSort,
  getNameTransApi,
  transUrl
}
