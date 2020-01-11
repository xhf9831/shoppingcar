<template>
 <div>
  <my-top>
    <div class="header" slot="left">
      <van-icon @click="getBack" size="20px" color="blue" name="arrow-left" />
    </div>
    <div class="header" slot="mid">
      最近浏览
    </div>
  </my-top>
     <div v-if="list.length>0">
     <div v-for="(item,index) in list" :key="index" class="content" @click="godetail(item)">
       <div class="left">
         <img class="l-p" :src="item.image_path" alt="">
       </div>
       <div class="right">
         <div class="title">{{item.name}}</div>
         <div class="price">￥{{item.present_price}}<del class="orl">￥{{item.orl_price}}</del></div>
         <div class="cancle"><van-icon @click.stop="cancelIt(index)" name="close" /></div>
       </div>
     </div>
   </div>
   <div id="title" v-else>
     还没有浏览记录，快去主页看看吧~~
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
     getBack(){
       this.$router.go(-1)
     },
     cancelIt(index){
       this.list.splice(index,1)
     },
     godetail(item){
      this.$router.push({path:'/malldetail',query:{id:item.id}})
     }     
   },
   mounted() {
     this.list = this.$store.state.see
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
#title{
  color: #C3C3C3;
  font-size:20px;
  text-align: center;
  margin-top: 20%;
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
      .orl{
        font-size: 14px;
        color: #323233;
        margin-left: 10px;
      }
    }
    .cancle{
      position: relative;
      margin-left: 190px;
    }
  }
}
</style>