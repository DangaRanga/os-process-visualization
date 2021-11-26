<template>
  <div id="container">
    <h1>Simulation for First Come First Serve Algorithm</h1>
    <main id="simulator">
      <!-- Respective sections for respective components -->
      <section id="algorithm-selection"><algorithm-selector /></section>
      <section id="processes">
        <process :pid="1"></process>
        <process :pid="2"></process>
        <process :pid="3"></process>
      </section>
      <section id="cpu">CPU</section>
    </main>
    <button id="restart-btn">Restart Simulation</button>
  </div>
</template>
<script>
import AlgoritmSelector from "../components/AlgorithmSelector/AlgorithmSelector.vue";
import Process from "../components/Process/Process.vue";

import anime from "animejs";

export default {
  components: {
    "algorithm-selector": AlgoritmSelector,
    process: Process,
  },

  methods: {
    animateProcesses() {
      anime({
        targets: "#processes",
      });
    },
  },
};
</script>
<style scoped>
#container {
  height: 100vh;
  overflow: hidden;
  text-align: center;
}

#container h1 {
  margin: 2% 0;
}
#simulator {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
}

#restart-btn {
  background: #86be43;
  padding: 20px 30px;
  border: none;
  color: #ffff;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  outline: none;
}

#restart-btn:hover {
  background: #4a632b;
  cursor: pointer;
}

#processes {
  display: flex;
  flex-direction: space-around;
  align-items: center;
  justify-content: center;
}
</style>
