<template>
 <div>
  <van-index-bar>
    <div v-for="item in Object.keys(citys)" :key="item.id">
      <van-index-anchor :index="item" />
      <van-cell v-for="itemtext in citys[item]" :title="itemtext.name" :key="itemtext.id" />
    </div>
  </van-index-bar>
 </div>
</template>

<script>
import citylist from '../../http/city'
 export default {
   data () {
     return {
       citys:{}
     }
   },
   components: {

   },
   methods: {
     getCity(){
       this.citys = citylist.data.cities
     },
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