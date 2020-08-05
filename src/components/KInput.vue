<template>
  <input :type="type" :value="value" @input="onInput" />
</template>

<script>
import emitter from "../utils/emitter";
export default {
  mixins: [emitter],
  data() {
    return {
      type: "",
      value: "",
    };
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
      // this.$parent.$emit("validata");
      console.log(this.dispath);
      this.dispath("KFormItem", "validata");
    },
  },
};
</script>

<style></style>
