<template>
  <div class="all-content">
    <my-top>
      <div class="t-content" slot="mid">
        <span class="t-title">商品分类</span>
      </div>
    </my-top>
    <div class="content">
      <div class="left">
        <van-sidebar v-model="mallCategoryId">
          <van-sidebar-item v-for="(item,index) in list"  @click="onChange(item)" :key="index" :title="item.mallCategoryName"/>
        </van-sidebar>
      </div>
      <div class="right">
        <van-tabs v-if="list[mallCategoryId]" v-model="active" @click="sendIt(list[mallCategoryId].bxMallSubDto[active].mallSubId)">
          <van-tab v-for="(item,index) in arr" :key="index" :title="item.mallSubName">
          </van-tab>
        </van-tabs>
        <div class="wrapper" ref="wrapper">
          <div class="wrap-content">
            <div @click="toDetail(item)" class="r-content" v-for="(item,index) in detail" :key="index">
              <div class="r-p-content">
                <img class="r-p" :src="item.image" alt="">
              </div>
              <div class="r-t-content">
                <div class="r-name">
                  {{item.name}}
                </div>
                <div class="r-price">
                  <span class="r-n-p">￥{{item.present_price}}</span>
                  <del class="r-o-p">{{item.orl_price}}</del>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name:'category',
  data() {
    return {
      mallCategoryId: 0,
      list: [],
      active: 0,
      arr: [],
      detail:[],
      defalutId:'',
      Id:''
    };
  },
  components: {},
  methods: {
    getText() {
      this.$api
        .recommend()
        .then(res => {
          this.list = res.data.category;
          this.arr=res.data.category[0].bxMallSubDto
          this.defalutId = this.list[this.mallCategoryId].bxMallSubDto[this.active].mallSubId
          this.sendIt(this.defalutId)
        })
        .catch(err => {
          console.log(err);
        });
    },
    onChange(item) {
      this.active = 0;
      this.arr = item.bxMallSubDto
      this.sendIt(item.bxMallSubDto[this.active].mallSubId)
    },
    sendIt(item){
      this.$api.category(item).then(res=>{
        this.detail = res.dataList
      }).catch(err=>{
        console.log(err);
      })
    },
    init() {
      this.bs = new BScroll(".wrapper", {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
    },
    toDetail(item){
      this.$router.push({path:'/malldetail',query:{id:item.id}})
    }
  },
  mounted() {
    this.getText();
    if(!this.$route.query.id){
      this.mamallCategoryId = this.mallCategoryId
    }else{
      this.mallCategoryId = this.$route.query.id -1
    }
    this.init();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.wrapper{
  overflow: hidden;
  height: 535px;
}
.all-content{
  padding-bottom: 13.33vw;
}
.t-content {
  line-height: 37.5px;
  .t-title {
    font-size: 20px;
  }
}
.content{
  display: flex;
  justify-content: space-between;
  background: white;
  .left{
    width: 75px;
  }
  .right{
    width: 285px;
    .r-content{
      display: flex;
      .r-p-content{
        width: 120px;
        .r-p{
          width: 120px;
        }
      }
      .r-t-content{
        .r-name{
          font-size: 17px;
          color: red;
          font-weight: 800;
        }
      }
      .r-price{
        .r-n-p{
          font-size: 16px;
          color: red;
          font-weight: 800;
        }
        .r-o-p{
          font-size: 13px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>