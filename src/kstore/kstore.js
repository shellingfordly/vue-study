let _Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;

    // 创建响应式的state
    //
    this._vm = new _Vue({
      // 不希望如此直接的暴露state
      // this.state = new _Vue({
      data() {
        // options.state将被代理到this.state下
        // return options.state;
        return {
          // 加上$符号，内部不对data下的数据作代理
          $$state: options.state,
        };
      },
    });

    // 强制绑定this
    this.commit = this.commit.bind(this);
    this.dispath = this.dispath.bind(this);

    // 返回一个响应式数据
    this.getters = this.proxy(options.getters);
  }

  proxy(getters) {
    // 暗号：天王盖地虎
    const self = this; // 存一下Store实例
    return new Proxy(getters, {
      // 对getters进行代理
      get(target, propKey) {
        // 返回对应的属性
        return Reflect.get(target, propKey)(self.state);
      },
      set(target, propKey) {
        console.error(propKey, "是只读属性");
        return true;
      },
    });
  }

  // 仓库储存的数据state
  get state() {
    // _data与$data一样，只是$data是希望暴露给用户看到的
    // _data是不希望暴露给用户和看到的
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("不可直接操作仓库内的数据");
  }

  commit(type, payload) {
    // dispath若不固定this指向，
    // actions内部的异步操作调用commit时，commit内部丢失this
    const entry = this._mutations[type];

    if (!entry) {
      console.error("unknown mutation");
      return;
    }

    // 传入仓库数据state
    entry(this.state, payload);
  }

  dispath(type, payload) {
    const action = this._actions[type];

    if (!action) {
      console.error("unknown mutation");
      return;
    }

    // 传入当前Store的实例做上下文
    // 由于actions内部可能会做一些复杂操作导致内部this丢失，
    // 因此需要在初始时对dispath绑定this指向
    return action(this, payload);
  }
}

function install(Vue) {
  _Vue = Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) Vue.prototype.$Store = this.$options.store;
    },
  });
}

export default {
  Store,
  install,
};
