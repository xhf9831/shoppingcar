<template>
 <div>
   <div class="all box">
     <div class="van__box"><van-icon size="25px" name="records" />全部订单</div>
     <div><van-icon name="arrow" /></div>
   </div>
   <div class="collection box" @click ="go('/collection')">
     <div class="van__box"><van-icon size="25px" name="points" />收藏商品</div>
     <div><van-icon name="arrow" /></div>
   </div>
   <div class="address box">
     <div class="van__box"><van-icon size="25px" name="location-o" />地址管理</div>
     <div><van-icon name="arrow" /></div>
   </div>
   <div class="colock box">
     <div class="van__box"><van-icon size="25px" name="clock-o" />最近浏览</div>
     <div><van-icon name="arrow" /></div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {
     go(text){
       this.$router.push(text)
     }
   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.box{
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  background: white;
  padding: 5px 10px;
}
.all{
  height: 50px;
}
</style>