<template>
 <div class="view">
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(item,index) in list.slides" :key="index">
      <img class="v-p" :src="item.image" alt="">
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