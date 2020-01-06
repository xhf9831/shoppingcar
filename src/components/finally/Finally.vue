<template>
 <div class="van__bot">
  <van-goods-action>
    <van-goods-action-icon icon="wap-home-o" text="首页" @click="go('/home')" />
    <van-goods-action-icon :info="num" icon="cart-o" text="购物车" @click="go('/shopcar')" />
    <van-goods-action-button type="warning" text="加入购物车" @click="sale(id)" />
    <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />

  </van-goods-action>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       num:''
     }
   },
   props:{
     id:{
       type:String,
       default:''
     }
   },
   components: {

   },
   methods: {
    go(text){
      this.$router.push(text)
    },
    sale(id) {
      this.$api.addShop(id).then(res=>{
        if(res.code === 200){
          this.$toast('已加入购物车');
          this.getNum()
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    getNum(){
      this.$api.getCard().then(res=>{
        this.num = res.shopList.length
      }).catch(err=>{
        console.log(err);
      })
    },
    onClickButton() {
    }
   },
   mounted() {
     this.getNum()
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>