export default {
  methods: {
    // 错误示范
    dispath1(componentName, eventName, props) {
      let parent = this.$parent || this.$root;
      // componentName在组件VueComponent下是拿不到的，在组件的$options中
      let name = parent.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        // 没有为name重新赋值
      }
      console.log(parent, name);  
      // 没有对parent作判断
      // this指向错误，componentName只是一个字符
      parent.$emit.apply(componentName, [eventName].concat(props));
    },
    dispath(componentName, eventName, props) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.componentName;
      }
      console.log(parent, name);
      if (parent) parent.$emit.apply(parent, [eventName].concat(props));
    },
  },
};
