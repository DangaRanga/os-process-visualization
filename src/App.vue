<template>
  <div id="container">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav/Nav.vue";
export default {
  components: {
    navbar: Nav,
  },
};
</script>
<style>
body {
  background-color: #282828;
}
* {
  margin: 0;
  padding: 0;

  text-decoration: none;
}

ul {
  list-style-type: none;
}

#container {
  background: #282828;
  color: #ffffff;
  height: 100%;
}

#app {
  font-family: "Helvetica Neue", sans-serif, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
