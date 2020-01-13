<template>
 <div>
   <my-top>
    <div class="header" slot="left">
      <van-icon @click="getBack" size="20px" color="blue" name="arrow-left" />
    </div>
    <div class="header" slot="mid">
      城市列表
    </div>
   </my-top>
   <div class="search van__pad">
    <van-search placeholder="请输入城市关键词" v-model="keywords" />
   </div>
   <div v-if="!keywords">
    <div>
      <div class="title">
        当前城市
      </div>
      <div class="text-box">
        <div @click="selectItem(city)" class="hotcity">
            {{city}}
        </div>
      </div>
    </div>
    <div>
      <div class="title">
        热门城市
      </div>
      <div class="box">
        <div @click="selectItem(item.name)" class="hotcity" v-for="item in hotcity" :key="item.id">
            {{item.name}}
        </div>
      </div>
    </div>
    <van-index-bar :index-list="Object.keys(citys)">
      <div v-for="item in Object.keys(citys)" :key="item.id">
        <van-index-anchor :index="item" />
        <van-cell @click="selectItem(itemtext.name)" v-for="itemtext in citys[item]" :title="itemtext.name" :key="itemtext.id" />
      </div>
    </van-index-bar>
   </div>
   <div v-else>
     <div @click="selectItem(item.name)" class="content" v-for="item in each" :key="item.id">
       {{item.name}}
     </div>
   </div>
 </div>
</template>

<script>
import citylist from '../../http/city'
 export default {
   data () {
     return {
       citys:{},
       hotcity:[],
       city:'',
       keywords:'',
       allcity:[]
     }
   },
   components: {

   },
   methods: {
     getCity(){
       this.citys = citylist.data.cities
       this.hotcity = citylist.data.hotCities
       Object.keys(this.citys).map(item=>{
         return this.allcity.push(...this.citys[item])
       })
     },
     selectItem(item){
       this.$store.state.city = item
       this.$router.go(-1)
     },
     getBack(){
       this.$router.go(-1)
     }
   },
   mounted() {
     this.getCity()
     this.city = this.$store.state.alreadycity
   },
   watch: {
   },
   computed: {
     each(){
      return this.allcity.filter(item =>{
          return JSON.stringify(item).includes(this.keywords)
      })
    }
   }
 }
</script>

<style scoped lang='scss'>
.content{
  padding: 2.667vw 4.267vw;
  overflow: hidden;
  color: #323233;
  font-size: 3.733vw;
  line-height: 6.4vw;
  background-color: #fff;
  width: 100%
}
.header{
  font-size: 20px;
  line-height: 37.5px;
}
.search{
  padding: 10px 10px;
}
.title{
    padding: 0 4.267vw;
    color: #323233;
    font-weight: 500;
    font-size: 3.733vw;
    line-height: 8.533vw;
    background-color: transparent;
}
.box{
  display: flex;
  background: white;
  width: 100%;
  flex-wrap: wrap;
  padding-bottom: 10px;
  .hotcity{
    text-align: center;
    border: 1px solid grey;
    border-radius: 4px;
    width: 110px;
    height: 25px;
    line-height: 25px;
    margin-top: 10px;
    margin-left: 7px;
  }
}
.text-box{
  padding-bottom: 10px;
  padding-top: 10px;
  background: white;
  width: 100%;
  .hotcity{
    text-align: center;
    border: 1px solid grey;
    border-radius: 4px;
    width: 110px;
    height: 25px;
    line-height: 25px;
    margin-left: 10px;
  }
}
</style>