<template>
 <div class="van__tag">
  <van-tabbar v-model="active">
    <van-tabbar-item icon="pending-payment">待付款</van-tabbar-item>
    <van-tabbar-item icon="tosend">待发货</van-tabbar-item>
    <van-tabbar-item icon="logistics">待收货</van-tabbar-item>
    <van-tabbar-item icon="orders-o" info="5">评价</van-tabbar-item>
    <van-tabbar-item icon="points">已完成</van-tabbar-item>
  </van-tabbar>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       active:-1
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

</style>