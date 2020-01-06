<template>
 <div>

 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {
     getData(){
       this.$api.getAddress().then(res=>{
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

</style>