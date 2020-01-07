<template>
 <div class="view">
  <van-swipe :autoplay="3000" :stop-propagation='false'>
    <van-swipe-item v-for="(item,index) in list.slides" :key="index">
      <img class="v-p" @click.stop="Todetail(item)" :src="item.image" alt="">
    </van-swipe-item>
  </van-swipe>
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
     },
     Todetail(item){
       this.$router.push({path:'/malldetail',query:{id:item.goodsId}})
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
.view{
  .v-p{
    margin-top: 50px;
    width: 100%;
  }
}
</style>