<template>
 <div class="bg">
   <div class="goback">
     <img class="back" @click="toLast()" src="../../assets/返回.svg" alt="">
   </div>
   <div class="bc van__it">
    <div class="title">
      登录/注册
    </div>
    <van-cell-group>
      <van-field
        v-model="nickname"
        placeholder="USERNAME"
        label="用户名"
        left-icon="contact"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="password"
        type="password"
        placeholder="PASSWORD"
        label="密码"
        left-icon="closed-eye"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="phone"
        label="手机号"
        left-icon="phone-o"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        left-icon="envelop-o"
        placeholder="请输入验证码"
      >
        <van-button v-if="num === 2" @click="replyCode(1)" slot="button" size="small" type="primary">{{msg}}</van-button>
        <van-button v-else-if="num === 1" disabled @click="replyCode" slot="button" size="small" type="primary">{{count}}秒后再试</van-button>
      </van-field>
    </van-cell-group>
    <div class="box">
      <van-cell-group>
        <van-field v-model="verify" />
      </van-cell-group>
      <span class="right" @click="changeCode" v-html="code"></span>
    </div>
    
    <div class="way">
      <div class="login">
        <van-button @click="submitForm()" type="primary">登录</van-button>
      </div>
      <div class="register">
        <van-button @click="registerForm()" type="danger">注册</van-button>
      </div>
    </div>
    
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       nickname:'',
       password:'',
       phone:'',
       sms:'',
       verify:'',
       code:'',
       msg:'发送验证码',
       count:60,
       num:2
     }
   },
   components: {

   },
   methods: {
     getData(){
       this.$api.getAverify().then(res=>{
         this.code = res
       }).catch(err=>{
         console.log(err);
       })
     },
     changeCode(){
       this.getData()
     },
     replyCode(num){
       if(this.phone.length !== 11 || !/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone) || this.phone === ''){
         alert ('您未输入正确的手机号码或者您输入的号码有误')
         this.phone = ''
       } else{
         this.num = num
         let timer = setInterval(()=>{
          if(this.count !== 0){
              this.num = 1
              this.count--
          }else {
              clearInterval()
              this.num = 2
              this.count = 60
              this.msg = '再次发送'
          }
        },1000)
       }
     },
     toLast(){
       this.$router.go(-1)
     },
     submitForm(){
       this.$api.login(this.nickname,this.password,this.verify).then(res=>{
         if(res.code === 200){
           this.$notify({type:'success',message:'登录成功'});
           localStorage.setItem("user",JSON.stringify({name:this.nickname}))
           this.$router.push('/home')
         }else if(res.code === -1){
           this.$notify({type:'danger',message:'用户名错误'});
           this.changeCode()
         }else if(res.code === -2){
           this.$notify({type:'danger',message:'验证码错误'});
           this.changeCode()
         }
       }).catch(err=>{
         console.log(err);
       })
     },
     registerForm(){
       this.$api.register(this.nickname,this.password,this.verify).then(res=>{
         if(res.code === 200){
           this.$notify({type:'success',message:'注册成功'});
           this.$router.push('/home')
         }else if (res.code === -1){
           this.$notify({type:'danger',message:'用户名已存在'});
           this.changeCode()
         }else if(res.code === -2){
           this.$notify({type:'danger',message:'验证码错误'});
           this.changeCode()
         }
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
.bg{
  background: url('../../assets/login.jpg') no-repeat;
  width: 100%;
  height: 667px;
  .goback{
    width: 40px;
    margin-left: 10px;
    margin-top: 10px;
    .back{
      width: 100%;
    }
  }
  .bc{
    padding: 10px 20px;
    background: white;
    position: relative;
    top: 10%;
    .title{
      font-size: 24px;
      padding: 20px 10px;
    }
    .way{
      margin-top: 20px;
      display: flex;
      .login{
        margin-left: 10px;
      }
      .register{
        margin-left: 20px;
      }
    }
    .box{
      display: flex;
      .right{
        position: relative;
        top:26px;
      }
    }
  }
}
</style>