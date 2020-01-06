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
        <div class="year">
          <div class="y-title">
            <span class="title">出生年月</span>
          </div>
          <div class="y-date">
            <span class="date" @click="changeFlag(true)">{{list.year}}年{{list.month}}月{{list.day}}日</span>
          </div> 
        </div>
        <van-datetime-picker
          v-model="currentTime"
          v-if="flag"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel ="cancel"
          @confirm ="confirm"
        />
        <div class="but-content van__but">
          <van-button type="primary" @click="submitIt()">保存</van-button>
        </div>
        <div class="but-content van__but">
          <van-button type="default">取消</van-button>
        </div>
      </van-popup>
     </div>
     <div class="photo">
       <img class="head" src="../../assets/psb.jpg" alt="">
     </div>
     <div v-if="user" class="user">
       欢迎您：{{user.nickname}}
     </div>
     <div @click="go('/login')" v-if="!user" class="user">
       登录/注册
     </div>
     <div v-if=" user !== null" class="exit" @click="exit">
       退出登录
     </div>
   </div>
   <mtag></mtag>
   <conf></conf>
 </div>
</template>

<script>
import mtag from '../../components/mineconstructure/Tag';
import conf from '../../components/mineconstructure/Confunction';
 export default {
   data () {
     return {
      user:null,
      show: false,
      list:[],
      flag:false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentTime:null
     }
   },
   components: {
     mtag,
     conf
   },
   methods: {
     exit(){
       this.$api.loginOut().then(res=>{
         if(res.code === 0){
          localStorage.clear()
          this.$toast('退出成功');
          this.$router.go(0)
         }
       })
     },
     go(text){
       this.$router.push(text)
     },
     showPopup(item) {
      if(this.user !== null){
        this.$api.user().then(res=>{
          this.show = item
          this.currentTime=new Date(res.userInfo.year,res.userInfo.month-1,res.userInfo.day)
          this.list = res.userInfo
        })}else if(this.user === null){
          this.$toast('请登录');
        }
      },
      changeFlag(item){
        this.flag = item
      },
      cancel(){
        this.flag = false
      },
      confirm(val){
        console.log(this.currentTime);
        this.list.year = this.$dayjs(val).format("YYYY")
        this.list.month = this.$dayjs(val).format("MM")
        this.list.day = this.$dayjs(val).format("DD")
        this.flag = false
      },
      submitIt(){
        let obj ={
          gender:this.list.gender,
          email:'383576897@qq.com',
          year:this.list.year,
          month:this.list.month,
          day:this.list.day,
          id:this.list._id,
          nickname:this.list.nickname
        };
        this.$api
        .saveUser(obj)
        .then(res=>{
          this.show = false
          this.user = res.user//直接改变user的值
          localStorage.setItem("user", JSON.stringify(res.user)) //改变本地储存的值
        }).catch(err=>{
          console.log(err);
        })
      }
   },
   mounted() {
     if(localStorage.user){
      this.user = JSON.parse(localStorage.getItem("user"))
     }else{
      this.user = null
     }
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.year{
  display: flex;
  width: 100%;
  padding: 2.667vw 4.267vw;
  border-bottom: 0.05px solid rgb(228, 228, 228);
  .y-title{
    width: 24vw;
   .title{
      color: #323233;
      font-size: 3.733vw;
      line-height: 6.4vw;
    } 
  }
  .y-date{
    width: 253px;
    .date{
      color: #323233;
      font-size: 3.733vw;
      line-height: 6.4vw;
    }
  }
}
.but-content{
  text-align: center;
  margin-top: 15px;
}
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