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
          123
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
       active:0
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
         console.log(res);
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
}
</style>