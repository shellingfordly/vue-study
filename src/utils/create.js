import Vue from "vue";

export default function(Component, props) {
  const Profile = Vue.extend(Component);
  const vueComponentExample = new Profile({
    propsData: props,
  }).$mount(); // 一定要挂载，否则没有$el虚拟Dom
  vueComponentExample.remove = function() {
    document.body.removeChild(vueComponentExample.$el);
    vueComponentExample.$destroy();
  };
  console.log(vueComponentExample);

  document.body.appendChild(vueComponentExample.$el);
}
