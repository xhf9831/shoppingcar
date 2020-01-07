<template>
 <div class="foot">
  <van-tabbar v-model="active" inactive-color="#000" active-color="red">
    <van-tabbar-item name='home' to="/" icon="wap-home-o">商城</van-tabbar-item>
    <van-tabbar-item name='category' to="/category" icon="wap-nav">分类</van-tabbar-item>
    <van-tabbar-item :info="num" name='shopcar' to="/shopcar" icon="shopping-cart">购物车</van-tabbar-item>
    <van-tabbar-item name='mine' to="/mine" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       active:'home',
       num:''
     }
   },
   components: {

   },
   methods: {
     getNum(){
      this.$api.getCard().then(res=>{
        if(res.code === 200 &&res.shopList.length>0){
          this.num = res.shopList.length
        }else if(res.code === 200 && res.shopList.length === 0){
          this.num = ''
        }
      }).catch(err=>{
        console.log(err);
      })
    }
   },
   mounted() {
     this.active = this.$route.name
     this.getNum()
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