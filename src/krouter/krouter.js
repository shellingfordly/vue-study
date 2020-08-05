let _Vue;

class VueRouter {
  constructor(options) {
    this.$options = options;

    // 优化路由查找
    // 缓存path和route的映射关系
    this.routeMap = {};
    options.routes.forEach((route) => {
      this.routeMap[route.path] = route;
    });

    const initial = window.location.hash.slice(1) || "/";
    // 使用_Vue.util.defineReactive给一个对象定义一个响应式属性
    // 当current变化时就会调用render函数重新渲染，重新查找对应的路由组件
    _Vue.util.defineReactive(this, "current", initial);

    // 使用Vue实例的data是响应式的方法
    // this.current = new _Vue({
    //   data() {
    //     return { initial };
    //   },
    // }).$data;

    // 使用Object.defineProperty无法响应视图
    // 会不会时我写的问题
    this.current = initial;
    this._current = initial;
    Object.defineProperty(this, "current", {
      get() {
        return this._current;
      },
      set(value) {
        this._current = value;
        return true;
      },
    });

    // 给this.current设置一个初始化的值，第一次就能匹配到路由渲染home了，
    // 但是切换路由时视图并不会改变，因为current被定死了，在路由查找时只会找到初始值
    // 因此要让current变成响应式
    // this.current = initial;

    // 监听hash url的变化
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }

  onHashChange() {
    // 存一下当前的hash url
    // 我们希望current是响应式的，这样在url变化时才会执行render函数，重新渲染视图
    this.current = window.location.hash.slice(1);
    // console.log(this.current);
  }
}

// VueRouter下的install静态方法
// 错误：VueRouter.prototype.install = function(Vue) {
VueRouter.install = function(Vue) {
  _Vue = Vue;

  // 拿到VueRouter类创建的router实例
  Vue.mixin({
    // 此处的this是组件的实例
    // 此处的混入会在每个组件执行，即每个组件在beforeCreate生命周期时，会执行下面的代码
    beforeCreate() {
      // 而只有new Vue生成的根实例上会存在router
      // 为啥要给Vue原型上挂载$router-->VueRouter的实例router
      if (this.$options.router) Vue.prototype.$router = this.$options.router;
    },
  });

  // Vue.prototype.$router = router;

  // 为啥在这创建组件
  Vue.component("router-link", {
    // router-link组件必传属性to
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    render(h) {
      return h(
        "a",
        {
          // 设置a标签的属性
          // hash # 页面不跳转
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", {
    render(h) {
      let component = null;
      // 找到当前url对应的组件
      /**
       * this.$router就是在beforeCreate钩子函数中挂载的VueRouter创建的实例router
       *    router实例下就有new VueRouter时传入带有路由配置对象routes的options参数
       *
       * 此处从路由配置对象routes中查找当前路由this.$router.current，（当前就是在监听路由变化时，
       *    给router实例下设置的current）从而从对应的route路由中获取与当前路由对应的组件component，
       *    并将其渲染
       */
      // const route = this.$router.$options.routes.find(
      //   (route) => route.path === this.$router.current
      // );

      /**
       * 问题：为什么第一次render执行route是undefined
       * 解答：只所以第一次的route是undefined，是因为一开始没有给this.$router.current设置值，
       *        所以没有找到匹配的路由。可以在
       */
      // console.log(route);
      // if (route) component = route.component;

      // 优化路由查询
      const { routeMap, current } = this.$router;
      console.log(routeMap, current);
      component = routeMap[current] ? routeMap[current].component : null;

      return h(component);
    },
  });
};

export default VueRouter;
