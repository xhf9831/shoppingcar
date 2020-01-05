<template>
 <div class="rec">
   <div class="re-content">
     <span class="re-title">商品推荐</span>
   </div>
   <div class="container">
     <div class="wrapperX" ref="wrapperX">
       <div class="content">
         <div class="s-detail" v-for="(item,index) in list" :key="index">
          <div class="s-p-content">
            <img class="s-p" :src="item.image" alt="">
          </div>
          <div class="s-content">
            <p class="s-title">{{item.goodsName}}</p>
          </div>
          <div class="s-price">
            <span class="s-l">￥{{item.mallPrice}}</span>
            <del class="s-r">￥{{item.price}}</del>
          </div>
          <div class="check">
            <span class="sale"><van-icon name="shopping-cart" color="white" /></span>
            <span @click="toDetail(item)" class="c-detail">查看详情</span>
          </div>
        </div>
      </div>
    </div>   
   </div>
 </div>
</template>

<script>
import BScroll from "better-scroll";
 export default {
   data () {
     return {
       list:[]
     }
   },
   components: {

   },
   methods: {
     getData(){
       this.$api.recommend().then(res=>{
         this.list = res.data.recommend;
       }).catch(err=>{
         console.log(err);
       })
     },
     init() {
      this.bs = new BScroll(".wrapperX", {
        scrollX: true,
        probeType: 3 // listening scroll hook
      }); 
    },
    toDetail(item){
      console.log(item);
      this.$router.push({path:'/malldetail',query:{id:item.goodsId}})
    }
   },
   mounted() {
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
.rec{
  background: white;
  .re-content{
    margin-top: 10px;
    margin-left: 20px;
    .re-title{
      color:#424242;
      font-size:18px;
    }
  }
  .wrapperX{
    overflow: hidden;
    .content{
      display: flex;
      width: 2120px;
    }
    .s-detail{
      width: 33.33vw;
      .s-p-content{
        width: 33.33vw;
        .s-p{
          width: 100%;
        }
      }
      .s-content{
        .s-title{
          color:#4B4B4B;
          margin: 0;
          overflow: hidden;
          white-space: nowrap;
          font-size: 15px;
          text-overflow: ellipsis;
        }
      }
      .s-price{
        .s-l{
          color:#4B4B4B;
        }
        .s-r{
          font-size: 14px;
          margin-left: 8px;
          color:#A1A1A1;
        }
      }
      .check{
        text-align: center;
        margin-top: 10px;
        height: 30px;
        .sale{
          text-align: center;
          padding: 5px;
          background: #FECA3A;
        }
        .c-detail{
          font-size:16px;
          text-align: center;
          background: #FF4C38;
          padding: 5px;
          color:white;
        }
      }
    }
  }
}
</style>