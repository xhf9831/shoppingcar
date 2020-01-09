<template>
<div>
  <my-top>
    <div class="header" slot="left">
      <van-icon @click="getBack" size="20px" color="blue" name="arrow-left" />
    </div>
    <div class="header" slot="mid">
      订单结算
    </div>
  </my-top>
  <div @click="go('/editaddress')" class="noaddress" v-if="address.length===0">
    <span class="add">点击添加收货地址</span>
  </div>
  <div class="address" @click="go('/addresslist')" v-else>
    <div class="top">
      <div class="pepoel">收货人：{{defaultadd.name}}</div>
      <div class="tel">{{defaultadd.tel}}</div>
    </div>
    <div class="bottom">
      <div class="left">
        <div><van-icon size="40px" name="location" /><span>{{defaultadd.address}}</span></div>
        <div class="title">(收货不便时，可选择免费待收货服务)</div>
      </div>
      <div class="right"><van-icon name="arrow" /></div>
    </div>
  </div>
  <div class="bg"></div>
  <div v-for="(item,index) in list" :key="index">
    <div class="store">
      <div class="left">
        <img class="l-p" :src="item.image_path" alt="">
      </div>
      <div class="right">
        <div class="title">
          {{item.name}}
        </div>
        <div class="sumcount">
          <div class="p-price">
            ￥{{item.mallPrice * item.count}}
          </div>
          <div class="count">
            ×{{item.count}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-submit-bar
    :price="sum"
    button-text="提交订单"
    @submit="onSubmit"
  />
</div>
</template>

<script>
 export default {
   data () {
     return {
       list:[],
       address:[],
       defaultadd:[],
       order:[],
       counts:0
     }
   },
   components: {

   },
   methods: {
     getBack(){
       this.$router.go(-1)
     },
     getData(){
       this.$api.getAddress().then(res=>{
         this.address = res.address
       }).catch(err=>{
         console.log(err);
       })
     },
     go(text){
       this.$router.push(text)
     },
     gerDefaultadd(){
       this.$api.getDefaultAddress().then(res=>{
         if(res.code === 200){
           this.defaultadd = res.defaultAdd
           console.log(this.defaultadd);
         }
       }).catch(err=>{
         console.log(err);
       })
     },
     onSubmit(){
       this.list.map(item=>{
         this.order.push(item.cid)
         this.counts += item.count
       })
       let obj = {
         address:this.defaultadd.address,
         tel:this.list.tel,
         orderId:this.order,
         totalPrice:this.sum,
         idDirect:false,
         count:this.counts
       }
       this.$api.placeOrder(obj).then(res=>{
         if(res.code === 200){
           this.$toast(res.msg);
           this.$router.push('/home')
         }
       }).catch(err=>{
         console.log(err);
       })
     }
   },
   mounted() {
     this.list = JSON.parse(localStorage.getItem("pay"))
     this.getData()
     this.gerDefaultadd()
   },
   watch: {

   },
   computed: {
     sum(){
       let sum = 0
       this.list.map(item=>{
         sum += item.mallPrice * item.count
       })
       return sum*100
     }
   }
 }
</script>

<style scoped lang='scss'>
.header{
  font-size: 20px;
  line-height: 37.5px;
}
.noaddress{
  text-align: center;
  width: 100%;
  height: 120px;
  background: white;
  .add{
    font-size: 18px;
    position: relative;
    top: 50px;
  }
}
.bg{
  background: url('../../assets/caitiao.jpg') no-repeat;
  background-size: 100%;
  height:8px;
}
.store{
  display: flex;
  padding: 5px 10px;
  background: white;
  .left{
    padding-left: 10px;
    width: 100px;
    .l-p{
      width: 100%;
    }
  }
  .right{
    padding: 5px 10px;
    width: 100%;
    .title{
      padding-right: 20px;
      font-size: 15px;
    }
    .sumcount{
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      .p-price{
        font-size: 15px;
        color: red;
      }
    }
  }
}
.address{
  width: 100%;
  height: 120px;
  background: white;
  .top{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 20px 25px 0 40px;
  }
  .bottom{
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    .left{
      .title{
        padding-top: 5px;
        padding-left: 40px;
        color:#F4DAC5;
      }
    }
    .right{
        position: relative;
        top:15px;
        right: 10px;
      }
  }
}
</style>