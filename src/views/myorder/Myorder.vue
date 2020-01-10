<template>
 <div>
  <my-top>
    <div class="header" slot="left">
      <van-icon @click="getBack" size="20px" color="blue" name="arrow-left" />
    </div>
    <div class="header" slot="mid">
      我的订单
    </div>
  </my-top>
  <div class="van__ba">
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="not">
          功能暂未开发~~
        </div>
      </van-tab>
      <van-tab title="待支付">
        <div class="not">
          功能暂未开发~~
        </div>
      </van-tab>
      <van-tab title="待支付">
        <div class="not">
          功能暂未开发~~
        </div>
      </van-tab>
      <van-tab title="待收货">
        <div class="not">
          功能暂未开发~~
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div class="nothappen" v-if="list.length === 0">
          <div class="title">
            暂无完成交易的商品
          </div>
          <div @click="go('/home')" class="tohome">
            去逛逛
          </div>
        </div>
        <div v-else>
          <div class="box" v-for="item in list" :key="item.id">
            <div class="f-box">
              <div class="head">
                订单编号：{{item.order_id}}
              </div>
              <div class="finish">
                交易完成
              </div>
            </div>
            <div class="m-box" v-for="index in item.order_list" :key="index.id">
              <div class="m-content">
                <img class="m-p" :src="index.image_path" alt="">
              </div>
              <div class="m-title">
                {{index.name}}
              </div>
              <div class="m-price">
                <div class="p-price">￥{{index.mallPrice | num()}}</div>
                <div class="p-count">×{{index.count}}</div>
              </div>
            </div>
            <div class="message">
              <div class="time">
                创建时间:{{item.add_time}}
              </div>
              <div class="address">
                收货地址:{{item.address}}
              </div>
              <div class="b-content">
                <span class="allcount">
                  共{{item.count}}件
                </span>
                <span class="allprice">
                  商品合计：{{item.mallPrice | num()}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>

 </div>
</template>

<script>
 export default {
   data () {
     return {
       active:4,
       user:{},
       dialog:false,
       list:[],
       allcount:''
     }
   },
   components: {

   },
   methods: {
     getBack(){
       this.$router.go(-1)
     },
     getData(){
      this.$api.getMyOrder().then(res=>{
        if (res.code === -1) {
          this.$toast('请登录后再来查看');
        }else{
          this.list = res.list
          this.list.map(item=>{
            this.allcount = 0
            item.order_list.map(itemx=>{
              this.allcount += itemx.count
            })
            item.count = this.allcount
          })
        }
      }).catch(err=>{
        console.log(err);
      })
     },
     go(text){
       this.$router.push(text)
     }
   },
   mounted() {
     this.getData()
     if(localStorage.user){
      this.user = JSON.parse(localStorage.getItem("user"))
     }else{
      this.user = null
     }
   },
   watch: {

   },
   filters:{
     num(val){
       return val.toFixed(2)
     }
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
.not{
  position: relative;
  font-size: 18px;
  color: #323233;
  text-align: center;
  margin-top:20%;
}
.anot{
  text-align: center;
  .login{
    position: relative;
    top: 110px;
  }
}
.nothappen{
  text-align: center;
  .title{
    font-size: 18px;
    color: #323233;
    margin-top: 120px;
  }
  .tohome{
    position: relative;
    top: 10px;
    left: 137px;
    border: 1px solid #323233;
    width: 100px;
    border-radius: 18px;
    padding: 10px 0;
  }
}
.box{
  margin: 10px;
  border-radius: 10px;
  padding: 5px;
  background: white;
  font-size: 14px;
  color: #323233;
  .f-box{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .finish{
      color:#D76B33
    }
  }
  .m-box{
    background:rgb(230, 230, 231);
    width: 100%;
    display: flex;
    .m-content{
      width: 100px;
      .m-p{
        width: 100%;
        height: 100%;
      }
    }
    .m-title{
      width: 180px;
    }
    .m-price{
      margin-left: 30px;
      text-align: right;
      width: 100%；
    }
  }
  .message{
    width: 100%;
    text-align: right;
    padding: 10px 0;
  }
}
</style>