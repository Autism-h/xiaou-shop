<template>
  <div>
    <div class="goodsList">
      <van-nav-bar title="小U商城" left-arrow @click-left="$router.back()" />
      <van-search v-model="value" placeholder="请输入搜索关键词" />
      <van-tabs
        v-model="active"
        background="#ff6040"
        color="#fff"
        line-width="20px"
      >
        <van-tab title="综合推荐"></van-tab>
        <van-tab title="销量"></van-tab>
        <van-tab title="价格"></van-tab>
        <van-tab title="好评度"></van-tab>
        <van-tab title="店铺"></van-tab>
      </van-tabs>
    </div>
    <div>
      <van-list v-if="goodsList.length > 0">
        <van-card
          v-for="item in goodsList"
          :key="item.id"
          :price="item.price.toFixed(2)"
          desc="描述信息"
          :title="item.goodsname"
          :thumb="$imgUrl + item.img"
          @click="goDetail(item.id)"
        />
      </van-list>
      <van-list v-else><van-empty description="暂无商品" /></van-list>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../util/axios";
export default {
  data() {
    return {
      value: "",
      active: 1,
      goodsList: [],
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      getGoods({
        fid: this.$route.query.id,
      }).then((res) => {
        if (res.code == 200) {
          this.goodsList = res.list ? res.list : [];
        }
      });
    },
    goDetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style  lang="">
@import "../assets/css/goodsList.css";
</style>
