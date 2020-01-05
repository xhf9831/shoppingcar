<template>
 <div class="foot">
  <van-tabbar v-model="active" inactive-color="#000" active-color="red">
    <van-tabbar-item name='home' to="/" icon="wap-home-o">商城</van-tabbar-item>
    <van-tabbar-item name='category' to="/category" icon="wap-nav">分类</van-tabbar-item>
    <van-tabbar-item name='shopcar' to="/shopcar" icon="shopping-cart">购物车</van-tabbar-item>
    <van-tabbar-item name='mine' to="/mine" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       active:'home'
     }
   },
   components: {

   },
   methods: {

   },
   mounted() {
     this.active = this.$route.name
   },
   watch: {
     $route(val){
       this.active = val.name
     }
   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.foot{
  background: white;
}
</style>