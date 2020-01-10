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
      :style="{ height: '40%' }"
    >
    <div class="top">
      <div class="left">
        <div class="l-all">
          <div class="l-content"><img class="l-p" :src="message.image" alt=""></div>
          <div>
            <div class="l-title">{{message.name}}</div>
            <div class="l-price">￥{{message.present_price}}</div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
      <div class="right">
        <van-icon @click="changeShow" name="close" />
      </div>
    </div>
    <div class="middle">
      <div class="m-left">
        <div class="salenum">购买数量:</div>
        <div>
          <span class="amount">剩余{{message.amount}}件</span>
          <span class="max">每人限购50件</span>
        </div>
      </div>      
      <div class="l-right">
        <van-stepper max="50" v-model="value" />
      </div>
    </div>
    <div class="van__position">
      <van-button @click="go('/payment')" type="danger" size="large">立即购买</van-button>
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
       num:'',
       value:'',
       arr:[]
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
          this.$store.state.num++
          this.num = this.$store.state.num
        }else{
          this.$toast('请登录后再来添加');
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    changeShow() {
      this.show = !this.show
    },
    go(text){
      if(localStorage.user){
        this.message.count = this.value
        this.message.cid = this.message.id
        this.message.mallPrice = this.message.present_price
        this.arr.push(this.message)
        console.log(this.arr);
        localStorage.setItem("now",JSON.stringify(this.arr))
        this.$router.push('/payment')
      }else{
        this.$toast('请登录后再来购买哦');
      }
    }
   },
   mounted() {
     if(this.$store.state.num !== 0){
       this.num = this.$store.state.num
     }else{
       this.num =''
     }
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
  font-size: 15px;
  padding: 0 10px 0 20px;
  color: #323233;
  .left{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .l-all{
      display: flex;
      .l-content{
        width: 110px;
        padding-right: 10px;
        .l-p{
          position: relative;
          top: -20px;
          width: 100%;
        }
      }
      .l-price{
        margin-top: 10px;
        color: #FF4949;
      }
    }
  }
}
.middle{
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 30px;
  color: #323233;
  font-size: 15px;
  .m-left{
    .amount{
      color: #AFAFAF;
    }
    .max{
      margin-left: 10px; 
      color: #FF4949;
    }
  }
}
</style>