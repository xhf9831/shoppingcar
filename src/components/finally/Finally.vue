<template>
 <div class="van__bot foot">
  <van-goods-action>
    <van-goods-action-icon icon="wap-home-o" text="首页" to="/home" />
    <van-goods-action-icon :info="num" icon="cart-o" text="购物车" to="/shopcar" />
    <van-goods-action-button type="warning" text="加入购物车" @click="sale(id)" />
    <van-goods-action-button type="danger" text="立即购买" @click="changeShow" />
  </van-goods-action>
  <div class="van__hid">
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '30%' }"
    >
    <div class="top">
      <div class="left">
        <div class="l-content"><img class="l-p" :src="message.image" alt=""></div>
        <div class="l-title">{{message.name}}</div>
      </div>
      <div class="right"></div>
    </div>
    </van-popup>
  </div>

 </div>
</template>

<script>
 export default {
   data () {
     return {
       show:false,
       num:''
     }
   },
   props:{
     id:{
       type:String,
       default:''
     },
     message:{
       type:Object,
       default:{}
     }
   },
   components: {

   },
   methods: {
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
        if(res.shopList.length>0){
          let num = 0
          res.shopList.map(item=>{
            num += item.count
          })
          this.num = num
        }else{
          this.num = ''
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    changeShow() {
      this.show = !this.show
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
.foot{
  width: 100%;
  height: 100%;
  background: white
}
.top{
  display: flex;
  justify-content: space-between;
  .left{
    .l-content{
      width: 110px;
      .l-p{
        position: relative;
        top: -20px;
        width: 100%;
      }
    }
  }
}
</style>