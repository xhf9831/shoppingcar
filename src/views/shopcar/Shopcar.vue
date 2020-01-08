<template>
 <div>
  <my-top>
    <div class="title" slot="mid">
      购物车
    </div>
  </my-top>
  <div v-if=" user === null" class="car">
    <img class="shop" src="../../assets/shop.png" alt="">
    <div class="message">
      请先登录噢~~
    </div>
    <div @click="go('/login')" class="login">
      去登录
    </div>
  </div>
  <div v-else>
    <div class="header">
      <div class="checkall van__select">
        <van-checkbox v-model="checked" checked-color="#E44E48" shape="square">全选</van-checkbox>
      </div>
      <div class="sum">
        合计：<span class="sumall">{{sum}}</span>
      </div>
    </div>
    <div v-for="item in list" :key="item.id">
      <div>
        <div class="left">
          <div>
            <van-checkbox v-model="checked" checked-color="#E44E48" shape="square"></van-checkbox>
          </div>
          <div>
            <img :src="item.image_path" alt="">
          </div>
        </div>
        <div class="right">
          <div>
            {{item.name}}
          </div>
          <div>
            <div>
              ￥{{item.present_price}}
            </div>
            <div>
              <van-stepper v-model="item.count" />
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       user:{},
       checked:'',
       sum:0,
       list:[]
     }
   },
   components: {

   },
   methods: {
     go(text){
       this.$router.push(text)
     },
     getData(){
       this.$api.getCard().then(res=>{
         if(res.code ===200){
           this.list = res.shopList
           console.log(this.list);
         }
       }).catch(err=>{
         console.log(err);
       })
     }
   },
   mounted() {
     this.getData()
     if(JSON.parse(localStorage.getItem("user")) !== null){
       return this.user = JSON.parse(localStorage.getItem("user"))
     }else if(JSON.parse(localStorage.getItem("user")) === null){
       return this.user = null
     }
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.title{
  font-size: 20px;
  line-height: 37.5px;
}
.car{
  text-align: center;
  width: 100%;
  height: 100px;
  .shop{
    position: relative;
    top: 50px;
    width: 30%;
  }
  .message{
    position: relative;
    top:80px;
    font-size: 20px;
  }
  .login{
    position: relative;
    top:120px;
    width: 120px;
    left: 110px;
    border: 1px solid black;
    border-radius: 20px;
    padding: 5px 20px;
    font-size: 20px;
  }
}
.header{
  display: flex;
  padding: 5px 15px;
  justify-content: space-between;
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid black;
  .sum{
    padding-right: 40px;
    .sumall{
      color: #E0322B;
    }
  }
}
</style>