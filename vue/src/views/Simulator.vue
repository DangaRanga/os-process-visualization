<template>
  <div id="container">
    <h1>Simulation for First Come First Serve Algorithm</h1>
    <main id="simulator">
      <!-- Respective sections for respective components -->
      <section id="algorithm-selection"><algorithm-selector /></section>
      <div id="middle-segment">
        <section id="processes">Processes</section>
        <button id="restart-btn">Restart Simulation</button>
      </div>
      <section id="cpu">CPU</section>
    </main>
  </div>
</template>
<script>
import AlgoritmSelector from "../components/AlgorithmSelector/AlgorithmSelector.vue";
export default {
  components: {
    "algorithm-selector": AlgoritmSelector,
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
</style>
