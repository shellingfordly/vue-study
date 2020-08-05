<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="err">{{ err }}</p>
  </div>
</template>

<script>
import Validator from "async-validator";
export default {
  name: "KFormItem",
  componentName: "KFormItem",
  inject: {
    form: {
      from: "form",
    },
  },
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      err: "",
    };
  },
  mounted() {
    this.$on("validata", () => {
      this.validata();
    });
  },
  methods: {
    validata() {
      // 校验
      // provide/inject
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];

      const validator = new Validator({ [this.prop]: rules });
      return validator.validate({ [this.prop]: value }, (err) => {
        if (err) {
          this.err = err[0].message;
        } else {
          this.err = "";
        }
      });
    },
  },
};
</script>

<style></style>
