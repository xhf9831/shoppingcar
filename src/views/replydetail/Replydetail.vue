<template>
  <div>
    <my-top>
      <div class="header" slot="left">
        <van-icon @click="getBack()" size="20px" color="blue" name="arrow-left" />
      </div>
      <div class="header" slot="mid">评价详情</div>
    </my-top>
    <div class="content">
      <div class="top">
        <div class="left">
          <div class="l-content">
            <img class="l-p" :src="user.avatar" alt />
          </div>
          <div class="rate">
            <van-rate
              v-model="list.rate"
              readonly
              :size="18"
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>
        <div class="time">{{list.comment_time}}</div>
      </div>
      <div class="mid">评价内容：{{list.content}}</div>
      <div class="body">
        <div class="b-left">
          <div class="b-content">
            <img class="b-p" :src="goods.image" alt />
          </div>
          <div class="b-title">{{goods.name}}</div>
        </div>
        <div class="b-right">
          <span class="add" @click="sale">
            <van-icon color="red" name="cart" />
          </span>
        </div>
      </div>
      <div class="back">
        <van-button @click="getBack()" type="primary" size="large">返回</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      list: [],
      goods: {},
      user:{}
    };
  },
  components: {},
  methods: {
    getBack() {
      this.$router.push({name:'replycenter',params:{active:1}});
    },
    sale() {
      this.$api.addShop(this.list.cid).then(res=>{
        if(res.code === 200){
          this.$toast('已加入购物车');
          this.$store.state.num++
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    getData() {
      this.$api
        .evaluateOne(this.id)
        .then(res => {
          if (res.code === 200) {
            this.list = res.evaluateOne;
            this.goods = res.evaluateOne.goods[0];
            this.user = res.evaluateOne.user[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.header {
  font-size: 20px;
  line-height: 37.5px;
}
.content {
  background: white;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    height: 70px;
    line-height: 70px;
    font-size: 15px;
    .left {
      display: flex;
      .l-content {
        width: 70px;
        border-radius: 50%;
        overflow: hidden;
        .l-p {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .mid {
    font-size: 15px;
    padding: 10px 15px;
  }
  .body {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .b-left {
      width: 270px;
      display: flex;
      .b-content {
        width: 90px;
        .b-p {
          width: 100%;
        }
      }
      .b-title {
        margin-top: 5px;
        width: 100%;
        margin-left: 5px;
      }
    }
    .b-right {
      position: relative;
      top: 25px;
      .add {
        background: #fce7e0;
        padding: 10px 12px;
        border-radius: 50%;
      }
    }
  }
  .back {
    margin-top: 320px;
  }
}
</style>