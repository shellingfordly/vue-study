<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validata(cb) {
      // 不装core-js对this.$children进行filter/map操作会报错
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validata());
      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => {
          cb(false);
        });
    },
  },
};
</script>

<style></style>
