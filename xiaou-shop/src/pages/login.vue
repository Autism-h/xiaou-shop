<template>
  <div>
    <div class="login">
      <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    </div>
    <van-form @submit="login">
      <van-field
        v-model="loginForm.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getLogin } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      getLogin(this.loginForm).then((res) => {
        if (res.code == 200) {
          sessionStorage.setItem("userInfo", JSON.stringify(res.list));
          this.$router.push("/mine");
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style  lang="">
@import "../assets/css/login.css";
</style>
