<template>
 <div>
   <div class="box" v-for="item in reply" :key="item.id">
      <div class="b-content">
        <img class="b-p" :src="item.comment_avatar" alt="">
      </div>
      <div class="top">
        <div class="u-content">
        <div class="user">{{item.comment_nickname}}:</div>
        <div class="time">{{item.comment_time}}</div>           
        </div>
        <div class="rate">
        <van-rate
          v-model="item.rate"
          readonly=""
          :size="10"
          color="#ee0a24"
          void-icon="star"
          void-color="#eee"
        />
        </div>
        <div class="content">
          {{item.content}}
        </div>
      </div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       
     }
   },
   props:{
     reply:{
         type:Array,
         default:()=>[]
       }
   },
   components: {

   },
   methods: {
   
   },
   mounted() {
     console.log(this.reply);
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.box{
  font-size:14px;
  display: flex;
  padding:10px 15px;
  .b-content{
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
    .b-p{
      width: 100%;
      height: 100%;
    }
  }
  .top{
    width: 100%;
    .u-content{
      display: flex;
      justify-content: space-between
    }
  }
}
</style>