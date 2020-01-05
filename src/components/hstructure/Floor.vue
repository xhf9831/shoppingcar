<template>
 <div class="content">
  <div class="floor">
    <span class="floor-n">{{floor}}</span>
    <span class="floor-t">{{title}}</span>
  </div>
  <div class="photo">
    <div class="left">
      <div class="fir-content">
        <img class="first" :src="arr[0].image" alt="">
      </div>
      <div class="for-content">
        <img class="forth" :src="arr[3].image" alt="">
      </div>
    </div>
    <div class="right">
      <div class="sec-content">
        <img class="second" :src="arr[1].image" alt="">
      </div>
      <div class="thi-content">
        <img class="third" :src="arr[2].image" alt="">
      </div>
      <div class="fix-content">
        <img class="fixth" :src="arr[4].image" alt="">
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
     floor:{
       type: String,
       default:''
     },
     title:{
       type:String,
       default:''
     },
     arr: {
        type: Array,
        default: () => []
      }
   },
   components: {

   },
   methods: {
     
   },
   mounted() {
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.content{
  margin-top: 10px;
  .floor{
    margin-bottom: 10px;
    text-align: center;
    .floor-n{
      border: 1px solid red;
      border-radius: 50%;
      background:red;
      color: white;
      font-size: 14px;
      margin-right: 3px;
    }
    .floor-t{
      color:red;
      font-size: 16px;
    }
  }
  .photo{
    background: white;
    display: flex;
    .left{
      width: 185px;
      .fir-content{
        .first{
          width: 185px;
        }
      }
      .for-content{
        .forth{
          width: 185px;
        }
      }
    }
    .right{
      width: 185px;
      .sec-content{
        .second{
          width: 185px;
        }
      }
      .thi-content{
        .third{
          width: 185px;
        }
      }
      .fix-content{
        .fixth{
          width: 185px;
        }
      }
    }
  }
}
</style>