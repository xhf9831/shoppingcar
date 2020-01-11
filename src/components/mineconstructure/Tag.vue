<template>
 <div class="van__tag">
  <van-tabbar v-model="active">
    <van-tabbar-item icon="pending-payment">待付款</van-tabbar-item>
    <van-tabbar-item icon="tosend">待发货</van-tabbar-item>
    <van-tabbar-item icon="logistics">待收货</van-tabbar-item>
    <van-tabbar-item :info="num" @click="go('/replycenter')" icon="orders-o">评价</van-tabbar-item>
    <van-tabbar-item @click="go('/myorder')" icon="points">已完成</van-tabbar-item>
  </van-tabbar>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       active:-1,
       page:1,
       num:''
     }
   },
   components: {

   },
   methods: {
     go(text){
       if (localStorage.user) {
         this.$router.push(text)
       }else{
         this.$toast('请登录后再试');
       }
     },
     getData(){
       this.$api.tobeEvaluated(this.page).then(res=>{
         if (res.data.count>0) {
           this.num = res.data.count
         }else{
           this.num = ''
         }
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

</style>