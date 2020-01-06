<template>
 <div>
   <my-top>
    <div class="header" slot="left">
      <van-icon @click="getBack" size="20px" color="blue" name="arrow-left" />
    </div>
    <div class="header" slot="mid">
      我的收藏
    </div>
   </my-top>
   <div>
     <div v-for="(item,index) in list" :key="index" class="content" @click="godetail(item)">
       <div class="left">
         <img class="l-p" :src="item.image_path" alt="">
       </div>
       <div class="right">
         <div class="title">{{item.name}}</div>
         <div class="price">￥{{item.present_price}}</div>
         <div class="cancle"><van-icon @click.stop="cancelIt(item)" name="close" /></div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       list:[],
       page:1,
     }
   },
   components: {

   },
   methods: {
     getBack(){
       this.$router.go(-1)
     },
     getData(){
       this.$api.getCollection(this.page)
       .then(res=>{
         this.list = res.data.list
       }).catch(err=>{
         console.log(err);
       })
     },
     cancelIt(item){
       this.$api.cancelCollection(item.cid).then(res=>{
         this.getData()
       }).catch(err=>{
         console.log(err);
       })
     },
     godetail(item){
      this.$router.push({path:'/malldetail',query:{id:item.cid}})
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
.header{
  font-size: 20px;
  line-height: 37.5px;
}
.content{
  display: flex;
  padding: 10px 20px;
  background: white;
  .left{
    width: 100px;
    .l-p{
      width: 100%;
    }
  }
  .right{
    .title{
      margin-top: 10px;
      font-size: 16px;
    }
    .price{
      margin-top: 30px;
      font-size: 16px;
      color: red;
      font-weight: 800;
    }
    .cancle{
      position: relative;
      margin-left: 190px;
    }
  }
}
</style>