<template>
  <div>
    <div class="cate_top">
      <van-nav-bar title="分类" />
      <van-search v-model="value" placeholder="请输入搜索关键词" />
    </div>
    <div class="cate_con">
      <div class="cate_left">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item
            v-for="item in cateNavList"
            :key="item.id"
            :title="item.catename"
          />
        </van-sidebar>
      </div>
      <div class="cate_right">
        <van-grid v-if="secondList.length > 0" :border="false" :column-num="3">
          <van-grid-item
            :to="'/goodslist?id=' + item.id"
            v-for="item in secondList"
            :key="item.id"
          >
            <van-image :src="$imgUrl + item.img" />
            <p>{{ item.catename }}</p>
          </van-grid-item>
        </van-grid>
        <van-grid v-else>
            <van-empty class="p" description="暂无商品" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getCateTree } from "../util/axios";
export default {
  data() {
    return {
      value: "",
      activeKey: 0,
      cateNavList: [],
      secondList: [],
    };
  },
  mounted() {
    this.getCateList();
  },
  methods: {
    onChange() {
      this.secondList = this.cateNavList[this.activeKey].children ? this.cateNavList[this.activeKey].children : [];
    },
    getCateList() {
      getCateTree().then((res) => {
        if (res.code == 200) {
          this.cateNavList = res.list;
          this.secondList = res.list[0].children;
        }
      });
    },
  },
};
</script>

<style  lang="">
@import "../assets/css/cate.css";
</style>
