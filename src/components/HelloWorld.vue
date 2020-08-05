<template>
  <div class="hello">
    <KForm :model="model" :rules="rules" ref="kform">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KFormItem from "./KFormItem.vue";
import KInput from "./KInput.vue";
import KForm from "./KForm.vue";
import Notice from "./Notice.vue";
import createComponent from "../utils/create";

export default {
  name: "HelloWorld",
  components: {
    KFormItem,
    KInput,
    KForm,
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "用户名不能为空" }],
        password: [{ required: true, message: "密码不能为空" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.kform.validata((bool) => {
        createComponent(Notice, {
          title: "提示信息",
          msg: bool ? "登录成功" : "登录失败",
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
