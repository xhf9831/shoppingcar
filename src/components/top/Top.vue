<template>
 <div class="top">
   <div>
     <slot name="left"></slot>
   </div>
   <div>
     <slot name="mid"></slot>
   </div>
   <div>
     <slot name='right'></slot>
   </div>
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
.top{
  display: flex;
  justify-content: space-between;
  height: 10vw;
  background: #EEF3FA;
}
</style>