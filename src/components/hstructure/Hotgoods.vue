<template>
 <div>
   <div class="h-title">
     <span class="title">热销产品</span>
   </div>
   <div class="product">
     <div class="p-content" v-for="(item,index) in list.hotGoods" :key="index">
       <div class="p-photo">
         <img class="p-image" :src="item.image" alt="">
       </div>
       <div class="van-ellipsis">{{item.name}}</div>
       <div class="content">
        <span class="m-price">￥{{item.mallPrice}}</span>
        <del class="price">{{item.price}}</del> 
       </div>
     </div>
   </div>
 </div>
</template>

<script>
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
         this.list = res.data;
       }).catch(err=>{
         console.log(err);
       })
     }
   },
   mounted() {
     this.getData()
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.h-title{
  text-align: center;
  .title{
    font-size: 15px;
    color:red;
  }
}
.product{
  margin-left: 3px;
  display: flex;
  flex-wrap: wrap;
  background: white;
  .p-content{
    padding: 5px 2px;
  }
  .p-photo{
    width: 180px;
    .p-image{
      width: 180px;
    }
  }
  .van-ellipsis{
    text-align: center;
    width: 160px;
  }
  .content{
    text-align: center;
    .m-price{
      color: red;
      font-size: 15px;
    }
    .price{
      margin-left: 5px;
      color:#A1A1A1;
      font-size: 15px;
    }
  }
}

</style>