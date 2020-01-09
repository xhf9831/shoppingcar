<template>
 <div>
   <keep-alive include="home,mine">
     <!-- 保存状态 -->
    <router-view></router-view>
   </keep-alive>
   <foot></foot>
 </div>
</template>

<script>
import foot from './foot/Foot'
 export default {
   data () {
     return {

     }
   },
   components: {
     foot
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