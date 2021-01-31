<template>
  <div>
    <div class="goodsDetail">
      <van-nav-bar title="商品详情" left-arrow @click-left="$router.back()" />
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
    <van-image
      width="7.5rem"
      height="8.25rem"
      fit="cover"
      :src="$imgUrl + detailList.img"
    />
    <div class="con_detail">
      <div class="price">
        <span>￥</span>{{ detailList.price
        }}<del>￥{{ detailList.market_price }}</del>
      </div>
      <p class="p1">{{ detailList.goodsname }}</p>
      <p class="p2" v-html="detailList.description"></p>
      <div class="text">11.11限时299元起</div>
      <div class="text1">
        此商品于2020-11-11,00点结束闪购特卖，品牌美妆闪购专场
      </div>
      <div>
        <span class="goodsname">购买数量</span>
        <van-stepper v-model="num" />
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" badge="1" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="1" />
      <van-goods-action-button
        @click="toCart"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button @click="toBuy" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { getGoodsInfo, addCart } from "../util/axios";
import { Toast } from "vant";
//调用弹框要引入一下
import { Dialog } from "vant";
export default {
  data() {
    return {
      active: 0,
      detailList: [],
      num: '',
    };
  },
  mounted() {
    getGoodsInfo({
      id: this.$route.query.id,
    }).then((res) => {
      if (res.code == 200) {
        this.detailList = res.list[0];
      }
    });
  },
  methods: {
    toCart() {
      if (sessionStorage.getItem("userInfo")) {
        addCart({
          uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
          num: this.num,
          goodsid: this.detailList.id,
        }).then((res) => {
          Toast.success(res.msg);
          this.$router.push({
            path: "/cart",
            query: {
              uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
            },
          });
        });
      } else {
        //未登录的状态让其去登录
        this.$router.push("/login");
      }
    },
    toBuy() {
      Dialog.alert({
        message: "订单页正在开发中.....",
      }).then(() => {
        // on close
      });
    },
  },
};
</script>

<style  lang="">
@import "../assets/css/goodsDetail.css";
</style>
