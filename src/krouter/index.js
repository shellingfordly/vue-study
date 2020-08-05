import VueRouter from "./krouter.js";
import Vue from "vue";
import Home from "../views/Router/Home.vue";
import About from "../views/Router/About.vue";

// Vue.use会调用传入VueRouter对象下的install方法
//
/**
 * 问题：为啥非要先调用Vue.use(VueRouter)，为啥不等router生成了再用
 * 解答：先执行Vue.use(VueRouter)，使用VueRouter，是因为需要在install中先把Vue给存下来，
 *      这样在new VueRouter生成router实例的时候，内部才能调用_Vue.util.defineReactive，
 *      把current设置为响应式数据，否则_Vue是undefined，无法处理current
 *      补充：由于使用Object.defineProperty并不能响应视图，暂定这里必须使用_Vue.util.defineReactive
 *      所以就必须先执行Vue.use(VueRouter)把Vue传入install方法，先将Vue存起来，待实例化router时使用
 *      正因为先调用了，所以在install方法中拿不到VueRouter的实例化对象router，所以要采用混入的方法将其设置延后到router生成
 */
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
];

// 问题：router实例是啥
const router = new VueRouter({
  routes,
});

// 若手动调用
// VueRouter.install(Vue, router);

export default router;
