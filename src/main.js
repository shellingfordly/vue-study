import Vue from "vue";
import App from "./App.vue";
import router from "./krouter";
import store from "./kstore";

Vue.config.productionTip = false;

new Vue({
  /**
   * 1. 传入的配置对象就是new Vue生成的根实例的$options属性
   * 2. 此处挂载router是为了，在根实例的beforeCreate生命周期函数中，
   *    将VueRouter创建的router实例挂到Vue原型上。因为在Vue.use使用
   *    插件时，router实例还没有
   * 问题：router的作用
   * 解答：此处挂载router是为了在Vue.use(VueRouter)时，通过混入延后获取router的操作能在new Vue生成的根实例中
   *      获取到根实例下的$options.router，并将其绑定到Vue原型的$router属性
   */
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
