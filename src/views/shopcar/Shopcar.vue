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
        <van-checkbox v-model="checkall" @click="changeAll" checked-color="#E44E48" shape="square">全选</van-checkbox>
      </div>
      <div>
        <div class="sum">
          <div class="num">
            合计：<span class="sumall">￥{{sum}}</span>
          </div>
          <span class="fun" v-if="this.list.some(item=>item.check)">
            <van-button type="danger" @click="deleteItem" size="small">删除</van-button>
            <span class="van__ma">
              <van-button type="danger" @click ="toPlace" size="small">去结算</van-button>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div v-for="(item,index) in list" :key="index">
      <div class="store">
        <div class="left">
          <div class="radius">
            <van-checkbox v-model="item.check" @change="checkone" checked-color="#E44E48" shape="square"></van-checkbox>
          </div>
          <div class="l-content">
            <img class="l-p" :src="item.image_path" alt="">
          </div>
        </div>
        <div class="right">
          <div class="title">
            {{item.name}}
          </div>
          <div class="sumcount">
            <div class="p-price">
              ￥{{item.mallPrice}}
            </div>
            <div class="count">
              <van-stepper @plus="add(item)" @minus="down(item)" v-model="item.count" />
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
   name:'shopcar',
   data () {
     return {
       user:{},
       checkall:false,
       list:[],
       arr:[],
       palce:[],
       dialog:false
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
           if(this.list.length===0){
             this.checkall = false
           }
         }
       }).catch(err=>{
         console.log(err);
       })
     },
     add(item){
       item.count++
       this.$api.editCart(item.count,item.cid,item.mallPrice)
       .then(res=>{
       }).catch(err=>{
       })
     },
     down(item){
       item.count--
       this.$api.editCart(item.count,item.cid,item.mallPrice)
       .then(res=>{
       }).catch(err=>{
       })
     },
     changeAll(){
       this.list.map(item=>{
         item.check = !this.checkall
       })
     },
     checkone(){
       this.checkall = this.list.every((item)=>{
         return item.check === true
       })
     },
     deleteItem(){
       this.list.map(item=>{
         if(item.check === true){
           this.arr.push(item.cid)
         }
       })
       this.$dialog.confirm({
          title: '提示',
          message: '是否删除被选中的商品'
        }).then((res) => {
          this.$api.deleteShop(this.arr).then(res=>{
            if(res.code === 200){
              this.$toast('删除成功');
              this.getData()
            }
          })
        }).catch((err) => {
          this.dialog = false
        });
       
       
     },
     toPlace(){
       this.list.map(item=>{
         if(item.check === true){
          this.palce.push(item)
        }
       })
       localStorage.setItem("pay",JSON.stringify(this.palce))
       this.$router.push('/payment')
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
     sum(){
       let sum=0
       this.list.map(item=>{
         if (item.check){
           sum += item.mallPrice * item.count
         }
       })
       return sum.toFixed(2)
     }
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
  line-height: 60px;
  border-bottom: 1px solid black;
  .sum{
    padding-right: 40px;
    .num{
      line-height: 60px;
      width: 160px;
      text-align: right;
      .sumall{
        color: #E0322B;
      }
    }
    .fun{
      position: relative;
      left: 40px;
      top: -35px;
    }
  }
}
.store{
  display: flex;
  padding: 5px 10px;
  background: white;
  .left{
    display: flex;
    width: 160px;
    justify-content: space-around;
    .l-content{
      width: 100px;
      .l-p{
        width: 100%;
      }
    }
    .radius{
      margin-top: 35%;
    }
  }
  .right{
    padding: 5px 10px;
    width: 100%;
    .title{
      font-size: 18px;
      color: red;
    }
    .sumcount{
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      .p-price{
        font-size: 18px;
        color: red;
      }
    }
  }
}
</style>