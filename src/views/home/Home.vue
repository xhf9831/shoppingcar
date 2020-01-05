<template>
 <div class="top-container">
   <my-top class="top">
    <div v-if="city !==''" slot="left" class="position">
      <span class="city">{{city}}</span>
      <span class="select">
        <img class="s-p" src="../../assets/下拉.svg" alt="">
      </span>
    </div>
    <div v-else slot="left" class="position">
      <van-loading size="24px">定位中...</van-loading>
    </div>
    <div slot="mid" class="ss van__pa">
      <van-search
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
      >
        <div slot="action">搜索</div>
      </van-search>
    </div>
  </my-top>
  <div class="wrapper" ref="wrapper">
    <div class="t-content">
      <van-pull-refresh
          v-model="isLoading"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
      <sview></sview>
      <cate></cate>
      <div class="adver" v-if="list.advertesPicture">
        <img class="a-p" :src="list.advertesPicture.PICTURE_ADDRESS" alt="">
      </div>
      <storer></storer>
      <div v-if="list.floorName">
        <floor :title="list.floorName.floor1" floor="1F" :arr="list.floor1"></floor>
        <floor :title="list.floorName.floor2" floor="2F" :arr="list.floor2"></floor>
        <floor :title="list.floorName.floor3" floor="3F" :arr="list.floor3"></floor>
        <!-- 组件传值 ，单独传值不需要冒号-->
      </div>
      <div>
        <hotgoods></hotgoods>
      </div>
      </van-pull-refresh>
      <div class="finally">
        ...没有更多了
      </div>
    </div>
  </div>
 </div>
</template>

<script>
import BScroll from "better-scroll";
import sview from '../../components/hstructure/View'
import cate from '../../components/hstructure/Cate'
import storer from '../../components/hstructure/Storerecommend'
import floor from '../../components/hstructure/Floor'
import hotgoods from '../../components/hstructure/Hotgoods'
 export default {
   data () {
     return {
       city:'',
       list:[],
       isLoading: false
     }
   },
   components: {
     sview,
     cate,
     storer,
     floor,
     hotgoods
   },
   methods: {
     getData(){
       this.$api.recommend().then(res=>{
         this.list = res.data;
       }).catch(err=>{
         console.log(err);
       })
     },
     onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    init() {
      this.bs = new BScroll(".wrapper", {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
    }
   },
   mounted() {
     let _this = this
     AMap.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,     
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })

      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      AMap.event.addListener(geolocation, 'error', onError)

      function onComplete (data) {
        // data是具体的定位信息
        _this.city = data.addressComponent.city
      }

      function onError (data) {
        // 定位出错
      }
    })
    this.getData(),
    this.init();
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.wrapper{ 
  height: 618px;
}
.top{
  position: fixed;
  z-index: 6;
  width: 100%;
  .city{
    margin-left: 20px;
    font-size: 15px;
  }
}
.position{
  line-height: 10vw;
  .select{
    position: relative;
    top: 1vw;
    right: 1vw;
    .s-p{
      width: 24px;
    }
  }
}
.adver{
  margin-top: 3vw;
  .a-p{
    width: 100%;
  }
}
.finally{
  color:#A1A1A1;
  text-align: center;
}
</style>