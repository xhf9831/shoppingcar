<template>
 <div class="category">
  <div v-for="(item,index) in list" :key="index" @click="sendIt(item)" class="detail">
    <img class="d-p" :src="item.image" alt="">
    <div>
      <span class="d-f">
        {{item.mallCategoryName}}
      </span>
    </div>
  </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       list:[]
     }
   },
   components: {

   },
   methods: {
     getData(){
       this.$api.recommend().then(res=>{
         this.list = res.data.category;
       }).catch(err=>{
         console.log(err);
       })
     },
     sendIt(text){
       this.$router.push({path:'/category',query:{id:text.mallCategoryId}})
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
.category{
  background:#FFFFFF;
  border-radius: 8px;
  text-align: center;
  display: flex;
  padding: 8px 3px;
  margin: 4px 10px;
  justify-content: space-around;
  .detail{
    cursor: pointer;
    flex: 1;
    .d-p{
      width: 11vw;
    }
    .d-f{
      position: relative;
      font-size: 13px;
    }
  }
}
</style>