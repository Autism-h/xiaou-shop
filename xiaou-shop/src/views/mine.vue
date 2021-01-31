<template>
  <div>
    <div class="mine_bg">
      <div class="mine">
        <van-nav-bar title="我的" />
        <div class="mine_img" v-if="userInfo">
          <van-image
            round
            width="1.3rem"
            height="1.3rem"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="user">
            <h2>{{ userInfo.nickname }}</h2>
            <p>完善资料让小U更懂你</p>
          </div>
        </div>
        <div class="mine_img" v-else>
          <van-image
            round
            width="1.3rem"
            height="1.3rem"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <!-- 用户名 -->
          <div class="user">
            <van-button @click="$router.push('/login')" type="warning"
              >快去登录</van-button
            >
          </div>
        </div>
        <div class="sope">
          <div class="sope_con">
            <p>12</p>
            <span>我的收藏</span>
          </div>
          <div class="sope_con">
            <p>12</p>
            <span>浏览记录</span>
          </div>
          <div class="sope_con">
            <p>￥0</p>
            <span>我的红包</span>
          </div>
          <div class="sope_con">
            <p>12</p>
            <span>优惠券</span>
          </div>
        </div>
        <div class="my_order">
          <h3>我的订单<a href="javascript:;">全部订单&gt;</a></h3>
          <van-grid :column-num="4" :border="false">
            <van-grid-item
              v-for="item in mineList"
              :key="item.title"
              :icon="item.brandImg"
              :text="item.title"
            />
          </van-grid>
        </div>
      </div>
      <div class="mine_nav">
        <div class="nav_list">
          <van-icon name="location" />
          <span>地址管理</span>
          <van-icon class="right" name="arrow" />
        </div>
        <div class="nav_list">
          <van-icon name="gold-coin" />
          <span>我的钱包</span>
          <van-icon class="right" name="arrow" />
        </div>
        <div class="nav_list">
          <van-icon name="enlarge" />
          <span>我的二维码</span>
          <van-icon class="right" name="arrow" />
        </div>
        <div class="nav_list">
          <van-icon name="friends" />
          <span>我的小伙伴</span>
          <van-icon class="right" name="arrow" />
        </div>
        <div class="nav_list">
          <van-icon name="balance-list" />
          <span>0元试用</span>
          <van-icon class="right" name="arrow" />
        </div>
        <div class="nav_list" @click="exit">
          <van-icon name="revoke" />
          <span>退出登录</span>
          <van-icon class="right" name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mineList: [
        //品牌集合
        {
          title: "待付款",
          brandImg: require("../assets/img/icon/user/order/payment.png"),
        },
        {
          title: "待收货",
          brandImg: require("../assets/img/icon/user/order/delivery.png"),
        },
        {
          title: "评价",
          brandImg: require("../assets/img/icon/user/order/evaluation.png"),
        },
        {
          title: "售后/退款",
          brandImg: require("../assets/img/icon/user/order/service.png"),
        },
      ],
      userInfo: {},
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : false;
  },
  methods: {
    exit() {
      sessionStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
  },
};
</script>

<style  lang="">
@import "../assets/css/mine.css";
</style>
