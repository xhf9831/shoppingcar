<template>
 <div>
    <my-top>
    <div class="header" slot="left">
      <van-icon @click="getBack" size="20px" color="blue" name="arrow-left" />
    </div>
    <div class="header" slot="mid">
      评价中心
    </div>
  </my-top>
  <div class="bg">
    <img class="b-p" src="../../assets/evaluate.jpg" alt="">
  </div>
  <div class="van__te">
    <van-tabs v-model="active"> 
      <van-tab title="待评价">
        <div class="van-content">
          <div class="e-box" v-for="item in list" :key="item.id">
            <div class="left">
              <img class="e-p" :src="item.image_path" alt="">
            </div>
            <div class="right">
              <div class="e-title">
                {{item.name}}
              </div>
              <div class="e-reply van__marg">
                <span class="toreply"><van-icon color="#FF4D4D" name="chat" />评论晒单</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已评价">
        <div class="van-content">
          123456
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
       active:0,
       list:[]
     }
   },
   components: {

   },
   methods: {
     getBack(){
       this.$router.go(-1)
     },
     getData(){
       this.$api.tobeEvaluated().then(res=>{
         this.list = res.data.list
         console.log(this.list);
       }).catch(err=>{
         console.log(err);
       })
     }
   },
   mounted() {
     this.getData()
   },
   watch: {

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
.bg{
  width: 100%;
  .b-p{
    width: 100%;
    height: 100%;
  }
}
.ccontet{
  position: relative;
  top:-20px;
}
.van-content{
  padding-top: 30px;
  background: white;
}
.e-box{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  .left{
    width: 150px;
    .e-p{
      width: 100%;
      height: 100%;
    }
  }
  .right{
    font-size: 15px;
    width: 100%;
    color: #323233;
    .e-reply{
      position: relative;
      top:60px;
      text-align: right;
      .toreply{
        border: 1px solid #FF4D4D;
        color: #FF4D4D;
        font-size: 13px;
        border-radius: 15px;
        padding: 5px 10px;
      }
    }
  }
}
</style>