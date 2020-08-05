<template>
  <div>
    <p>{{ title }}</p>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    msg: {
      type: String,
    },
  },
  mounted() {
    setTimeout(() => {
      this.remove();
    }, 1000);
  },
};
</script>

<style></style>
