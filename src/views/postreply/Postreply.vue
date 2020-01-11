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
  <div class="box">
    <div class="b-content">
      <img class="b-p" :src="msg.image_path" alt="">
    </div>
    <div class="right">
      <div class="r-title">商品评分</div>
      <div class="rate">
        <van-rate
          v-model="value"
          :size="25"
          color="#ee0a24"
          void-icon="star"
          void-color="#eee"
        />
      </div>
    </div>
  </div>
  <div class="van__fiel">
     <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      placeholder="说说你的购买感受吧~~"
    /> 
  </div>
  <div class="van__top anonymous">
    <van-switch size="20px" v-model="checked" /><span class="title">匿名评价</span>
  </div>
  <div class="submit">
    <van-button type="primary" @click="submitItem" size="large">提交</van-button>
  </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       msg:'',
       value:0,
       message:'',
       checked:false
     }
   },
   components: {

   },
   methods: {
     getBack(){
       this.$router.go(-1)
     },
     submitItem(){
       let obj={
         id:this.msg.cid,
         rate:this.value,
         content:this.message,
         anonymous:this.checked,
         _id:this.msg._id,
         order_id:this.msg.order_id,
         image:[]
       }
       this.$api.comment(obj).then(res=>{  
         if (res.code === 200) {
           this.$toast('提交成功');
           this.$router.go(-1)
         }
       }).catch(err=>{
         console.log(err);
       })
     }
   },
   mounted() {
     this.msg = this.$route.params.msg
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
.box{
  display: flex;
  background: white;
  font-size: 18px;
  color: #323233;
  .b-content{
    width: 120px;
    .b-p{
      width: 100%;
    }
  }
  .right{
    margin-left: 20px;
    .r-title{
      margin-top: 20px;
    }
    .rate{
      margin-top: 20px;
    }
  }
}
.anonymous{
  height: 40px;
  background: white;
  line-height: 40px;
  font-size: 15px;
}
.submit{
  background: white;
  padding-top:20px;
}
</style>