export const obj = new Proxy(
  {},
  {
    get(target, propKey) {
      console.log(target[propKey]);
      // 返回对应的属性
      return Reflect.get(target, propKey);
    },
    set() {
      console.log("设置了属性");

      return true;
    },
  }
);
