<template>
 <div class="top-container">
   <my-top class="top">
    <div v-if="city !==''" slot="left" class="position">
      <span class="city" @click="go('/city')">{{city}}</span>
      <span class="select">
        <img class="s-p" src="../../assets/下拉.svg" alt="">
      </span>
    </div>
    <div v-else slot="left" class="position">
      <van-loading size="24px">定位中...</van-loading>
    </div>
    <div slot="mid" class="ss van__pa">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        background
        :show-action="show"
        @focus="changeAt(true)"
        @search="searchItem"
        @cancel ="changeAt(false)"
      >
      </van-search>
      <van-popup
        v-model="show"
        position="bottom"
        :overlay = 'false'
        :style="{height: '93.5%' }"
      >
      <div v-if="value">
        <div id="content" v-for="item in arr" :key="item.id">
          <div id="left">
            <img class="a-p" :src="item.image" alt="">
          </div>
          <div id="right">
            <div class="title" @click="toDetail(item)" v-html="item.name">
            </div>
            <div class="price">
              <span class="p-price">￥{{item.present_price}}</span>
              <del class="o-price">{{item.orl_price}}</del>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="memory.length>0" class="textinp">
          <div class="head">
            <div>
              搜索历史
            </div>
            <div>
              <van-icon @click="del" name="delete" />
            </div>
          </div>
          <div class="content">
            <div @click="giveItem(item.name)" class="value" v-for="item in memory" :key="item.id">
              {{item.name}}
            </div>
          </div>
          
        </div>
        <div class="textnull" v-else>
          暂无搜索历史
        </div>
      </div>
      </van-popup>
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
import util from '../../http/util'
 export default {
   name:'home',
   data () {
     return {
       city:'',
       list:[],
       isLoading: false,
       show:false,
       value:'',
       page:1,
       arr:[],
       memory:[],
       dialog:false,
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
    },
    go(text){
      this.$router.push(text)
    },
    changeAt(item){
      this.show = item
      if(!this.show){
        this.value = ''
      }
      if(!this.value){
        this.arr=[]
      }
    },
    searchItem(val){
      val = this.value
      if(!this.$store.state.values.some(item=>item.name===val)){
        this.$store.state.values.push({name:this.value})
      }
      this.$api.search(this.value,this.page).then(res=>{
        if(res.code === 200){
          this.arr = res.data.list
          this.arr.map(item=>{
            item.name = util.keyWord(item.name,this.value.trim())
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    del(){
      this.$dialog.confirm({
          title: '提示',
          message: '是否清楚所有搜索历史'
        }).then((res) => {
          this.$store.state.values.splice(0)
          this.$store.state.values = this.memory
          this.$toast('已经清空');
        }).catch((err) => {
          this.dialog = false
      });
    },
    giveItem(item){
      this.value = item
      if(!this.$store.state.values.some(item=>item.name===this.value)){
        this.$store.state.values.push({name:this.value})
      }
      this.$api.search(this.value,this.page).then(res=>{
        if(res.code === 200){
          this.arr = res.data.list
          this.arr.map(item=>{
            item.name = util.keyWord(item.name,this.value.trim())
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    toDetail(item){
      this.$router.push({path:'/malldetail',query:{id:item.id}})
    }
   },
   mounted() {
     if(!this.$store.state.city){
      let _this = this
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 1000,
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
          _this.$store.state.alreadycity = _this.city
        }

        function onError (data) {
          // 定位出错
        }
      })
     }
     this.memory = this.$store.state.values
    this.getData(),
    this.init();
    if(this.$store.state.city){
      this.city = this.$store.state.city
    }else{
      this.city = ''
    }
    if(this.city){
      this.$store.state.alreadycity = this.city
    }
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
#content{
  display: flex;
  padding: 10px 10px;
  #left{
    width: 110px;
    .a-p{
      width: 100%;
      height: 100%;
    }
  }
  #right{
    width: 100%;
    margin-left: 15px;
    font-size: 17px;
    .price{
      margin-top: 10px;
      .p-price{
        font-size: 16px;
        color: red;
      }
      .o-price{
        margin-left: 8px; 
        font-size: 14px;
      }
    }
  }
}
.textnull{
  text-align: center;
  margin-top: 25%;
}
.textinp{
  padding: 10px 20px;
  font-size: 15px;
  .head{
    display: flex;
    justify-content: space-between
  }
  .content{
    display: flex;
    flex-wrap: wrap;
    .value{
      margin-top: 10px;
      margin-left: 10px;
      border: 1px solid #cacdd1;
      border-radius: 10px;
      padding: 2px 5px;
      text-align: center;
      background: #cacdd1;
    }
  }
}
</style>