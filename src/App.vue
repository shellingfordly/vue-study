<template>
  <div id="app">
    <router-link to="/home">Home</router-link>
    <span> | </span>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
    <p>counter: {{ $Store.state.counter }}</p>
    <button @click="$Store.commit('add')">add counter</button>
    <button @click="$Store.dispath('add')">async add counter</button>
    <p>doubleCounter: {{ $Store.getters.doubleCounter }}</p>
    <p>threeCounter: {{ $Store.getters.threeCounter }}</p>
    <button @click="$Store.getters.doubleCounter++">add doubleCounter</button>
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
