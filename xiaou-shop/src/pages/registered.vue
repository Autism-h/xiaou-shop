<template>
  <div>
    <div class="registered">
      <van-nav-bar title="注册" left-arrow @click-left="$router.back()" />
    </div>
    <van-form @submit="reg">
      <van-field
        v-model="registered.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="registered.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="registered.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { register } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      registered: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    reset() {
      this.registered = {
        phone: "",
        nickname: "",
        password: ""
      };
    },
    reg() {
      register(this.registered).then(res=>{
        if(res.code == 200){
          this.$router.push('/login')
          Toast.success(res.msg)
          this.reset()
        }else{
          Toast.fail(res.msg)
        }
      })
    },
  },
};
</script>

<style  lang="">
@import "../assets/css/registered.css";
</style>
