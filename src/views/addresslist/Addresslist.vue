<template>
 <div>
   <my-top>
    <div class="header" slot="left">
      <van-icon @click="getBack" size="20px" color="blue" name="arrow-left" />
    </div>
    <div class="header" slot="mid">
      地址列表
    </div>
   </my-top>
   <div class="van__fun" v-if="list.length>0">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"  
      @add="go('/editaddress')"
      @edit="edit"
    />
   </div>
   <div v-if="list.length === 0" > 
     <div id="title">
       暂无收货地址~~
     </div>
    <div class="van__position">
      <van-button @click="go('/editaddress')" type="danger" size="large">新增地址</van-button>
    </div>
   </div> 
   
 </div>
</template>

<script>
 export default {
   data () {
     return {
       list:[],
       chosenAddressId:null
     }
   },
   components: {

   },
   methods: {
     getData(){
       this.$api.getAddress().then(res=>{
         if(res.code === 200){
           console.log(res.address);
           res.address.map(item=>{
             if (item.isDefault===true) {
               if(res.address.indexOf(item)!==0){
                res.address.unshift(...res.address.splice(res.address.indexOf(item),1))//这里面删除过后返回的是个数组，三个点可以重新返回数组的索引位置
               }
             }
           })
           this.list = res.address
           console.log(this.list);
         }
         if(this.list.length>0){
           this.list.map(item=>{
            item.id = item._id
            if(item.isDefault){
              this.chosenAddressId = item.id
            }
          })
          if(!this.list.some(item=>item.isDefault)){
            this.$api.setDefaultAddress(this.list[0].id).then(res=>{
              this.chosenAddressId =this.list[0].id
              this.list[0].isDefault=true
            })
          }
        }
       }).catch(err=>{
         console.log(err);
       })
     },
     getBack(){
       this.$router.go(-1)
     },
     go(text){
       if(!localStorage.user){
         this.$toast('请登录后再去添加');
         this.$router.push('/login')
       }else{
         this.$router.push(text)
       }
     },
     edit(item){
       if(!localStorage.user){
         this.$toast('请登录后再去添加');
         this.$router.push('/login')
       }else{
         this.$router.push({name:'editaddress',params:{ item: item }})
       } 
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
#title{
  color: #C3C3C3;
  font-size:20px;
  text-align: center;
  margin-top: 20%;
}
.header{
  font-size: 20px;
  line-height: 37.5px;
}
</style>