(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"05dc":function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".skeleton-list[data-v-d068bffe]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:0 %?20?%;margin-top:%?-80?%}.fall[data-v-d068bffe]{width:%?344?%;height:auto;margin-top:%?20?%}.mock-list[data-v-d068bffe]{width:%?344?%;height:%?344?%}.mock-content[data-v-d068bffe]{width:%?344?%;height:%?40?%;margin-top:%?20?%}.mock-desc[data-v-d068bffe]{float:left;width:%?280?%;height:%?40?%}.mock-radius[data-v-d068bffe]{float:left;width:%?40?%;height:%?40?%;margin-left:%?20?%}",""])},"18bb":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"page"},[e("v-uni-view",{staticClass:"waterfall-box"},[e("v-uni-view",{staticClass:"fall left"},t._l(t.leftList,function(i,a){return e("v-uni-view",{key:a,staticClass:"col-box",on:{click:function(e){e=t.$handleEvent(e),t.toPath(i)}}},[e("v-uni-view",{staticClass:"pic-box"},[e("v-uni-image",{staticClass:"pic",style:{height:.468*i.imgHeight+"px",background:i.color},attrs:{src:i.thumbnail,"lazy-load":"true"}})],1),e("v-uni-view",{staticClass:"wall-desc-box"},[e("v-uni-view",{staticClass:"left-content"},[e("v-uni-view",{staticClass:"title omit2"},[e("v-uni-text",{staticClass:"tag"},[t._v(t._s(i.tag))]),t._v(t._s(i.desc))],1),e("v-uni-view",{staticClass:"info"},[e("v-uni-view",{staticClass:"point"}),e("v-uni-view",{staticClass:"source-item"},[e("v-uni-text",{staticClass:"source-text"},[t._v("麦时尚")]),e("v-uni-text",{staticClass:"source-text"},[t._v(t._s(i.date))]),e("v-uni-text",{staticClass:"source-text"},[t._v("|")]),e("v-uni-text",{staticClass:"source-text"},[t._v("评论（"+t._s(i.commentCount||0)+"）")])],1)],1)],1),e("v-uni-view",{staticClass:"right-like",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.handleLike(a,"leftList")}}},[e("v-uni-image",{staticClass:"like-icon",attrs:{src:i.clickLike?t.like2:t.like1}}),e("v-uni-text",{staticClass:"liked"},[t._v(t._s(i.likes))])],1)],1)],1)}),1),e("v-uni-view",{staticClass:"fall right"},t._l(t.rightList,function(i,a){return e("v-uni-view",{key:a,staticClass:"col-box",on:{click:function(e){e=t.$handleEvent(e),t.toPath(i)}}},[e("v-uni-view",{staticClass:"pic-box"},[e("v-uni-image",{staticClass:"pic",style:{height:.468*i.imgHeight+"px",background:i.color},attrs:{src:i.thumbnail,"lazy-load":"true"}})],1),e("v-uni-view",{staticClass:"wall-desc-box"},[e("v-uni-view",{staticClass:"left-content"},[e("v-uni-view",{staticClass:"title omit2"},[e("v-uni-text",{staticClass:"tag"},[t._v(t._s(i.tag))]),t._v(t._s(i.desc))],1),e("v-uni-view",{staticClass:"info"},[e("v-uni-view",{staticClass:"point"}),e("v-uni-view",{staticClass:"source-item"},[e("v-uni-text",{staticClass:"source-text"},[t._v("麦时尚")]),e("v-uni-text",{staticClass:"source-text"},[t._v(t._s(i.date))]),e("v-uni-text",{staticClass:"source-text"},[t._v("|")]),e("v-uni-text",{staticClass:"source-text"},[t._v("评论（"+t._s(i.commentCount||0)+"）")])],1)],1)],1),e("v-uni-view",{staticClass:"right-like",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.handleLike(a,"rightList")}}},[e("v-uni-image",{staticClass:"like-icon",attrs:{src:i.clickLike?t.like2:t.like1}}),e("v-uni-text",{staticClass:"liked"},[t._v(t._s(i.likes))])],1)],1)],1)}),1)],1)],1)},s=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return s})},"20a2":function(t,i,e){var a=e("a08c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=e("4f06").default;s("250d7c4a",a,!0,{sourceMap:!1,shadowMode:!1})},"390f":function(t,i,e){"use strict";e.r(i);var a=e("5221"),s=e("9d57");for(var n in s)"default"!==n&&function(t){e.d(i,t,function(){return s[t]})}(n);e("dbf4");var o=e("2877"),l=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,"d068bffe",null);i["default"]=l.exports},4279:function(t,i,e){"use strict";var a=e("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=a(e("75fc"));e("7f7f");var n=a(e("9fc9")),o={components:{waterFall:n.default},data:function(){return{showSkeleton:!0,skeletonList:[1,2,3,4,5,6,7,8],list:[],skip:this.$filter.getRandom(500),limit:10,loading:!0,prevList:[],leftList:[],rightList:[],leftHeight:0,rightHeight:0}},onLoad:function(){this.getHybridList()},methods:{getHybridList:function(){var t=this;this.$api.getList({limit:this.limit,skip:this.skip}).then(function(i){var e=i.data.data;"string"===typeof i.data&&(console.log("unicode 处理"),e=t.$filter.decodeUnicode(i.data).data);var a=[];e.map(function(i,e){i.images[0].width&&i.images[0].height&&a.push({thumbnail:t.$filter.getThumbnail(i.images[0].uri),uri:i.images[0].uri,desc:i.data.description?i.data.description:t.$filter.getShareMsg(),color:t.$filter.randomBgColor(e),date:i.data.date?t.$filter.getDate(i.data.date):"",likes:i.data.likes?t.$filter.getNumber(i.data.likes):t.$filter.getRandom(),tag:i.data.tags&&i.data.tags.length>0?i.data.tags[0].tag:"",imgHeight:t.$filter.getRatioHeight(i.images[0].width,i.images[0].height),commentCount:t.$filter.getRandom(999),api:i.catalog.name})});var n=[].concat((0,s.default)(t.prevList),a),o=t.leftHeight,l=t.rightHeight,c=t.leftList,r=t.rightList;n.map(function(t,i){var e=.468*t.imgHeight;t.thumbnailHeight=e,o<=l?(c.push(t),o+=e):(r.push(t),l+=e)}),console.log(o,l),t.leftList=c,t.rightList=r,t.leftHeight=o,t.rightHeight=l})},loadMore:function(t){this.skip+=10,this.loading=!0,this.prevList=this.list,this.getHybridList()}}};i.default=o},5221:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"page"},[e("v-uni-scroll-view",{staticStyle:{height:"100vh"},attrs:{"scroll-y":!0,"enable-back-to-top":!0,"lower-threshold":"100"},on:{scrolltolower:function(i){i=t.$handleEvent(i),t.loadMore(i)}}},[e("water-fall",{attrs:{leftList:t.leftList,rightList:t.rightList}})],1)],1)},s=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return s})},"5fbb":function(t,i,e){"use strict";e.r(i);var a=e("d915"),s=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,function(){return a[t]})}(n);i["default"]=s.a},"75fc":function(t,i,e){"use strict";e.r(i);var a=e("a745"),s=e.n(a);function n(t){if(s()(t)){for(var i=0,e=new Array(t.length);i<t.length;i++)e[i]=t[i];return e}}var o=e("774e"),l=e.n(o),c=e("c8bb"),r=e.n(c);function u(t){if(r()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return l()(t)}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(t){return n(t)||u(t)||d()}e.d(i,"default",function(){return f})},7733:function(t,i,e){"use strict";var a=e("20a2"),s=e.n(a);s.a},8541:function(t,i,e){var a=e("05dc");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=e("4f06").default;s("274b8413",a,!0,{sourceMap:!1,shadowMode:!1})},"9d57":function(t,i,e){"use strict";e.r(i);var a=e("4279"),s=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,function(){return a[t]})}(n);i["default"]=s.a},"9fc9":function(t,i,e){"use strict";e.r(i);var a=e("18bb"),s=e("5fbb");for(var n in s)"default"!==n&&function(t){e.d(i,t,function(){return s[t]})}(n);e("7733");var o=e("2877"),l=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,"0e638a6c",null);i["default"]=l.exports},a08c:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".waterfall-box[data-v-0e638a6c]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-top:%?16?%}.fall[data-v-0e638a6c]{width:%?351?%;height:auto}.col-box[data-v-0e638a6c]{width:100%;height:auto;margin-bottom:%?16?%;-webkit-box-shadow:0 2px 6px 0 rgba(0,0,0,.06);box-shadow:0 2px 6px 0 rgba(0,0,0,.06);position:relative}.left[data-v-0e638a6c]{margin-right:%?16?%}.pic[data-v-0e638a6c]{width:100%;display:block;border-top-left-radius:%?8?%;border-top-right-radius:%?8?%}.wall-desc-box[data-v-0e638a6c]{width:100%;height:%?128?%;background:#fff}.left-content[data-v-0e638a6c]{width:%?248?%;height:auto;padding:%?12?% 0 0 %?16?%;float:left}.title[data-v-0e638a6c]{width:%?248?%;height:%?60?%;font-size:%?22?%;margin-top:%?8?%;font-family:PingFangSC-Semibold,sans-serif}.tag[data-v-0e638a6c]{color:#a255fb}.info[data-v-0e638a6c]{width:100%;height:%?30?%;\n  /* background: #00f; */margin-top:%?8?%}.point[data-v-0e638a6c]{width:%?16?%;height:%?16?%;border-radius:50%;background:#f8ba03;float:left;margin:%?12?% %?4?% 0 0}.source-item[data-v-0e638a6c]{width:auto;height:%?30?%;line-height:%?30?%}.source-text[data-v-0e638a6c]{margin-right:%?6?%;font-size:%?16?%}.right-like[data-v-0e638a6c]{float:right;width:%?60?%;height:auto;margin:%?28?% %?15?% 0 0\n  /* background: #00f; */}.like-icon[data-v-0e638a6c]{width:%?40?%;height:%?32?%;display:block;margin:0 auto}.liked[data-v-0e638a6c]{font-size:%?18?%;color:#606060;text-align:center;display:block;margin-top:%?10?%}.shop-box[data-v-0e638a6c]{position:absolute;top:0;right:0;width:%?64?%;height:%?52?%;background:#fff;\n  /* box-shadow:0px 2px -6px 0px rgba(0,0,0,0.6) */-webkit-box-shadow:-2px 2px 6px rgba(0,0,0,.6);box-shadow:-2px 2px 6px rgba(0,0,0,.6)}.shop-img[data-v-0e638a6c]{width:%?30?%;height:%?30?%;display:block;margin:%?11?% %?6?%;float:left}.shop-num[data-v-0e638a6c]{line-height:%?60?%;font-size:%?16?%;color:#a255fb;float:left}",""])},d915:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={props:["leftList","rightList"],data:function(){return{newList:[],index:0,mark:0,boxHeight:[],top:[],left:[],loadingTop:0,like1:"/static/images/like1.png",like2:"/static/images/like2.png"}},mounted:function(){},watch:{},methods:{toPath:function(t){console.log(t.uri),this.$global.navigateTo("/pages/img/img?uri=".concat(t.uri,"&api=").concat(t.api))},handleLike:function(t,i){this[i][t].clickLike?(this[i][t].clickLike=!1,this[i][t].likes-=1):(this[i][t].clickLike=!0,this[i][t].likes+=1),this.$forceUpdate()}}};i.default=a},dbf4:function(t,i,e){"use strict";var a=e("8541"),s=e.n(a);s.a}}]);