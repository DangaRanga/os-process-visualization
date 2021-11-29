<template>
  <nav class="navbar">
    <div class="logo">
      <h2>JV</h2>
    </div>

    <div id="routes">
      <router-link to="/">Simulator</router-link>
      <router-link to="/info/fcfs">FCFS Algorithm</router-link>
      <router-link to="/info/round_robin">Round Robin</router-link>

      <router-link to="/info/priority_scheduling"
        >Priority Scheduling</router-link
      >

      <router-link to="/info/shortest_job_first"
        >Shortest Job First</router-link
      >
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
};
</script>
<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
  display: block;
  font-size: 0.8em;
}

#routes {
  display: flex;
  justify-content: space-around;
  gap: 1em;
}

nav a.router-link-exact-active {
  color: #86be43;
}
</style>
