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
  <div v-else></div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       user:{}
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
</style>