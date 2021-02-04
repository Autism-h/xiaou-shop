<template>
  <div>
    <div class="home">
      <van-nav-bar title="小U商城" left-arrow />
      <div class="logo_top">
        <van-icon name="location-o" size="30" color="#fff" />
        <img class="logo" :src="logo" alt="" />
        <van-search v-model="value" placeholder="请输入搜索关键词" />
        <van-icon name="shop-o" size="30" color="#fff" />
      </div>
      <van-tabs
        v-model="active"
        background="#ff6040"
        color="#fff"
        line-width="20px"
      >
        <van-tab title="推荐"></van-tab>
        <van-tab title="女装"></van-tab>
        <van-tab title="鞋包"></van-tab>
        <van-tab title="居家"></van-tab>
        <van-tab title="母婴"></van-tab>
        <van-tab title="美妆"></van-tab>
      </van-tabs>
    </div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in bannerList" :key="item.title">
        <img class="banner" :src="$imgUrl + item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        v-for="item in brandList"
        :key="item.title"
        :icon="item.brandImg"
        :text="item.title"
      />
    </van-grid>
    <div class="con">
      <div class="Seconds">
        <div class="con_left">
          <h1>限时秒杀<span>查看更多&gt;</span></h1>
          <p>每天0点场，好货秒不停</p>
          <div class="timer">
            <span>05</span> : <span>20</span> :
            <span>48</span>
          </div>
        </div>
        <div class="con_right">
          <div class="con_rightUP">
            <h2>品牌上新</h2>
            <p>9点整，抢大牌</p>
            <span>疯抢红包&gt;</span>
          </div>
          <div class="con_rightUP con_rightDow">
            <h2>日用好货</h2>
            <p>愿君多采撷</p>
            <span>塞满奖券&gt;</span>
          </div>
        </div>
      </div>
      <van-tabs class="tab" v-model="activeName">
        <van-tab title="热卖商品" name="a">
          <van-card
            v-for="item in hotList"
            :key="item.id"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="$imgUrl + item.img"
          />
        </van-tab>
        <van-tab title="最新商品" name="b">
          <van-card
            v-for="item in newList"
            :key="item.id"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="$imgUrl + item.img"
          />
        </van-tab>
        <van-tab title="所有商品" name="c">
          <van-card
            v-for="item in goodsList"
            :key="item.id"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="$imgUrl + item.img"
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import logo from "../assets/img/pic/logo/white.png";
import { getBanner, getIndexGoods } from "../util/axios";
export default {
  data() {
    return {
      active: 0,
      value: "",
      logo,
      bannerList: [], //轮播图
      hotList: [], //热卖商品
      newList: [], //最新商品
      goodsList: [], //最新商品
      brandList: [
        //品牌集合
        {
          title: "限时秒杀",
          brandImg: require("../assets/img/icon/index/kingkong/seckill.png"),
        },
        {
          title: "畅销商品",
          brandImg: require("../assets/img/icon/index/kingkong/top.png"),
        },
        {
          title: "品质大牌",
          brandImg: require("../assets/img/icon/index/kingkong/brand.png"),
        },
        {
          title: "小U自营",
          brandImg: require("../assets/img/icon/index/kingkong/selfsupport.png"),
        },
        {
          title: "积分商城",
          brandImg: require("../assets/img/icon/index/kingkong/integral.png"),
        },
      ],
      activeName: "a",
    };
  },
  mounted() {
    this.getBannerList();
    this.IndexGoodsList();
  },
  methods: {
    //轮播图
    getBannerList() {
      getBanner().then((res) => {
        if (res.list) {
          this.bannerList = res.list;
        }
      });
    },
    //商品信息
    IndexGoodsList() {
      getIndexGoods().then((res) => {
        if (res.code == 200) {
          this.hotList = res.list[0].content;
          this.newList = res.list[1].content;
          this.goodsList = res.list[2].content;
        }
      });
    },
  },
};
</script>

<style  lang="">
@import "../assets/css/home.css";
</style>
