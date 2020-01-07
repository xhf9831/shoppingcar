<template>
 <div>
  <van-index-bar>
    <div v-for="item in Object.keys(citys)" :key="item.id">
      <van-index-anchor :index="item" />
      <van-cell @click="selectItem(itemtext.name)" v-for="itemtext in citys[item]" :title="itemtext.name" :key="itemtext.id" />
    </div>
  </van-index-bar>
 </div>
</template>

<script>
import citylist from '../../http/city'
 export default {
   data () {
     return {
      //  list:[ABCDEFGHJKLMNPQRTWXYZ]
       citys:{}
     }
   },
   components: {

   },
   methods: {
     getCity(){
       this.citys = citylist.data.cities
       console.log(this.citys);
     },
     selectItem(item){
       this.$router.push({name:'home',params:{item:item}})
       this.$router.push('/home')
     }
   },
   mounted() {
     this.getCity()
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>