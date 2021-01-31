<template>
  <div>
    <div class="cart">
      <van-nav-bar title="购物车" left-arrow @click-left="$router.back()" />
      <van-tabs
        v-model="active"
        background="#ff6040"
        color="#fff"
        line-width="20px"
      >
        <van-tab title="商品"></van-tab>
        <van-tab title="评价"></van-tab>
        <van-tab title="详情"></van-tab>
        <van-tab title="推荐"></van-tab>
      </van-tabs>
    </div>
    <van-list v-if="cartlist.length > 0">
      <van-swipe-cell v-for="item in cartlist" :key="item.id">
        <van-card
          :num="item.num"
          :price="item.price.toFixed(2)"
          desc="描述信息"
          :title="item.goodsname"
          class="goods-card"
          :thumb="$imgUrl + item.img"
        >
          <template #footer>
            <van-stepper
              v-model="item.num"
              theme="round"
              button-size="22"
              disable-input
            />
          </template>
        </van-card>
        <template #right>
          <van-button @click="del(item.id)" square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-submit-bar :price="3000" button-text="提交订单" />
    </van-list>
    <van-list v-else
      ><van-empty description="购物车空空如也快去买买买！！！"
    /></van-list>
  </div>
</template>

<script>
import { cartList,cartDelete } from "../util/axios";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      cartlist: [],
      num: 0,
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      cartList({
        uid:
          this.$route.query.uid ||
          JSON.parse(sessionStorage.getItem("userInfo")).uid,
      }).then((res) => {
        this.cartlist = res.list ? res.list : [];
      });
    },
    del(id){
      cartDelete({id}).then(res=>{
        if(res.code == 200){
          this.getCartList();
          Toast.success(res.msg);
        }else{
          Toast.fail(res.msg);
        }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("userInfo")) {
      next();
    } else {
      Dialog.confirm({
        title: "未登录",
        message: "未登录不能查看购物车，快登录！！！",
      })
        .then(() => {
          // on confirm
          console.log("跳到登录");
          next("/login");
        })
        .catch(() => {
          //取消就回到上一页
          next(from.path);
        });
    }
  },
};
</script>

<style  lang="">
@import "../assets/css/cart.css";
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
</style>
