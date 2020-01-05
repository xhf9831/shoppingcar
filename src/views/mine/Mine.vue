<template>
 <div>
   <my-top>
     <div class="header" slot="mid">
       会员中心
     </div>
   </my-top>
   <div class="bc">
     <div class="set">
       <van-icon @click="showPopup(true)" color="white" size="20px" name="setting" />
       <van-popup v-model="show" position="right" :style="{width:'100%' , height: '100%' }">
        <my-top>
          <div class="header" slot="left">
            <van-icon @click="showPopup(false)" size="20px" color="blue" name="arrow-left" />
          </div>
          <div class="header" slot="mid">
            个人资料
          </div>
        </my-top>
        <van-cell-group>
        <van-field
          label="github"
          readonly
        />
        </van-cell-group>
        <div class="h-p">
          <div class="left">头像</div>
          <div class="right">
            <div class="r-content">
              <img class="r-p" :src="list.avatar" alt="">
            </div>
            <div class="r-i">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <van-cell-group>
        <van-field
          v-model="list.username"
          label="用户名"
          disabled
        />
        </van-cell-group>
        <van-cell-group>
        <van-field
          v-model="list.nickname"
          label="昵称"
        />
        </van-cell-group>
        <van-cell-group>
        <van-field
          :value="list.gender"
          label="性别"
        />
        </van-cell-group>
        <van-cell-group>
        <van-field
          placeholder="请输入邮箱"
          label="邮箱"
        />
        </van-cell-group>
        <van-cell-group>
        <van-field
          v-model="list.date"
          label="出生年月"
        />
        </van-cell-group>
      </van-popup>
     </div>
     <div class="photo">
       <img class="head" src="../../assets/psb.jpg" alt="">
     </div>
     <div v-if="user !== null" class="user">
       欢迎您：{{user.name}}
     </div>
     <div @click="go('/login')" v-if=" user === null" class="user">
       登录/注册
     </div>
     <div v-if=" user !== null" class="exit" @click="exit">
       退出登录
     </div>
   </div>
   <mtag></mtag>
 </div>
</template>

<script>
import mtag from '../../components/mineconstructure/Tag';
 export default {
   data () {
     return {
      user:{},
      show: false,
      list:[]
     }
   },
   components: {
     mtag
   },
   methods: {
     exit(){
       localStorage.clear()
       this.$api.loginOut().then(res=>{
         if(res.code === 0){
           this.$notify({type:'success',message:'退出成功'});
         }
       })
       this.$router.push('/login')
     },
     go(text){
       this.$router.push(text)
     },
     showPopup(item) {
      this.show = item;
      if(this.show === true){
        this.$api.user().then(res=>{
          res.userInfo.date = `${res.userInfo.year}年${res.userInfo.month}月${res.userInfo.day}日`
          //将转译的时间添加进去
          this.list = res.userInfo
          console.log(this.list);
        }).catch(err=>{
          console.log(err);
        })
      } 
    }
   },
   mounted() {
     if(JSON.parse(localStorage.getItem("user")) !== null){
       return this.user = JSON.parse(localStorage.getItem("user"))
     }else if(JSON.parse(localStorage.getItem("user")) === null){
       return this.user = null
     }
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.h-p{
  padding: 10px 16px;
  height: 70px;
  line-height: 70px;
  display: flex;
  justify-content: space-between;
  .left{
    font-size: 14px;
    color: #323233;
  }
  .right{
    display: flex;
    .r-content{
      border-radius: 50%;
      overflow: hidden;
      width: 70px;
      .r-p{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.set{
  margin-left: 350px;
  padding-top: 10px;
}
.header{
  font-size: 20px;
  line-height: 37.5px;
}
.bc{
  background: #E30C7B;
  height: 240px;
  .photo{
    position: relative;
    top:25px;
    left: 140px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
    .head{
      width: 100%;
    }
  }
  .user{
    font-size: 20px;
    color: white;
    text-align: center;
    position: relative;
    top:30px;
  }
  .exit{
    font-size: 15px;
    color: white;
    text-align: center;
    position: relative;
    top:40px;
  }
}
</style>