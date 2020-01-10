<template>
 <div class="bc">
   <div class="mid">
     <div class="goback">
       <img class="back" @click="toLast()" src="../../assets/返回.svg" alt="">
     </div>
     <div class="swipe">
      <van-swipe :autoplay="3000" indicator-color="#FF8855" :stop-propagation='false'>
        <van-swipe-item v-for="index in 3" :key="index">
          <img @click.stop="clickIem()" class="s-p" :src="list.image" alt="">
        </van-swipe-item>
      </van-swipe>
      <van-image-preview
        v-model="show"
        :images="arr" 
      >
      </van-image-preview>
    </div>
    <div class="name">
      {{list.name}}
    </div>
    <div class="price">
      ￥{{list.present_price}}
    </div>
    <div class="thing">
      <div class="extra">运费:{{list.__v}}</div>
      <div class="over">剩余:{{list.amount}}</div>
      <div>
        <div v-if="num === 1" class="like">收藏商品：<img @click="collectIt(2)" class="ph" src="../../assets/爱心.svg"></div>
        <div v-else  class="like">取消收藏：<img @click="cancelcollectIt(1)" class="ph" src="../../assets/收藏.svg"></div>
      </div>
    </div>
    <div class="shop">
      <div class="left">
        <span class="icon"><van-icon name="shop-o" /></span>有赞的店<span class="text">官方</span>
      </div>
      <div class="right">
        进去店铺 <span class="second"><van-icon name="arrow" /></span>
      </div>
    </div>
    <van-tabs class="van__feng" v-model="active">
      <van-tab title="商品详情"><div v-html="list.detail"></div></van-tab>
      <van-tab title="商品评论"></van-tab>
    </van-tabs>
   </div>
   <fina :message="list" :id="list.id"></fina>
 </div>
</template>

<script>
import fina from '../../components/finally/Finally'
 export default {
   data () {
     return {
       id:'',
       page:1,
       list:{},
       arr:[],
       show:false,
       //有几张图滚几张图
       active:0,
       num:1
     }
   },
   components: {
     fina
   },
   methods: {
     getData(){
       this.$api.goodOne(this.id,this.page = 1).then(res=>{
         this.list = res.goods.goodsOne
         this.arr.push(this.list.image)
         this.arr.push(this.list.image)
         this.arr.push(this.list.image)
       }).catch(err=>{
         console.log(err);
       })
     },
     getAtitude(){
       this.$api.isCollection(this.id).then(res=>{
         if(res.isCollection === 1){
           this.num = 2
         }
       }).catch(err=>{
        console.log(err);
       })
     },
     clickIem() {
      this.show = !this.show
    },
    toLast(){
       this.$router.go(-1)
     },
    collectIt(num){
       this.$api.collection(this.list).then(res=>{
         if(res.code === 200){
           this.num = num
           this.$toast('收藏成功');
         }else if(res.code === -1){
           this.$toast('请登录');
         }
       }).catch(err=>{
         console.log(err);
       })
     },
    cancelcollectIt(num){
       this.$api.cancelCollection({id:this.id}).then(res=>{
         if(res.code === 200){
           this.num = num
           this.$toast('已取消收藏');
         }
       }).catch(err=>{
         console.log(err);
       })
     }
   },
   mounted() {
     this.id = this.$route.query.id
     this.getData()
     this.getAtitude()
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.bg{
  color: #FF4444
}
.goback{
    width: 40px;
    margin-left: 10px;
    .back{
      width: 100%;
    }
}
.mid{
  padding-bottom: 45px;
}
.bc{
  background: white
}
.swipe{
background: white
}
.s-p{
  width: 100%;
}
.name{
  margin-top: 20px;
  margin-left: 10px;
  font-size: 18px;
}
.price{
  margin-left: 10px;
  font-size: 15px;
  color: red;
}
.thing{
  padding: 20px 10px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  color: #CBCBC2;
  font-size: 15px;
  .like{
    .ph{
      position: relative;
      top:3px;
      width: 20px;
    }
  }
}
.shop{
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding:10px 10px;
  .left{
    .icon{
      position: relative;
      top:2px;
    }
    .text{
      margin-left: 10px;
      padding: 2px 5px;
      background: #FF4444;
      border-radius: 5px;
      color:white;
    }
  }
  .right{
    .second{
      color: #C3C3CC;
    }
  }
  
}
</style>