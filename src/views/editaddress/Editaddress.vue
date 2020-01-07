<template>
 <div>
   <my-top>
    <div class="header" slot="left">
      <van-icon @click="getBack" size="20px" color="blue" name="arrow-left" />
    </div>
    <div class="header" slot="mid">
      编辑地址
    </div>
   </my-top>
   <van-address-edit
      :area-list="areaList"
      :address-info = "editList"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
 </div>
</template>

<script>
import arelist from '../../http/area'
 export default {
   data () {
     return {
      areaList:arelist,
      editList:{}
     }
   },
   components: {

   },
   methods: {
     getBack(){
       this.$router.go(-1)
     },
     onSave(val) {
       let obj={
         name:val.name,
         tel:val.tel,
         address:`${val.province}${val.city}${val.county}${val.addressDetail}`,
         province:val.province,
         city:val.city,
         county:val.county,
         addressDetail:val.addressDetail,
         isDefault:val.isDefault,
         areaCode:val.areaCode,//必填
         id:this.editList ? this.editList._id :''
       };
       this.$api.postAddress(obj).then(res=>{
         if(res.code === 200){
           this.$toast('添加成功');
           this.$router.go(-1)                      
         }
       }).catch(err=>{
         console.log(err);
       })
    },
    onDelete() {
      Toast('delete');
    },
    onDelete(item){
      if(item.id){
        this.$api.deleteAddress(item.id).then(res=>{
          if(res.code === 200){
            this.$toast('删除成功');
            this.$router.go(-1)
          }
        }).catch(err=>{
          console.log(err);
        })
      }else{
        this.$toast('无信息');
      }
      
    }
   },
   mounted() {
    this.editList = this.$route.params.item
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.header{
  font-size: 20px;
  line-height: 37.5px;
}
</style>