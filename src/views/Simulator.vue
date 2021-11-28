<template>
  <div id="container">
    <h1>Simulation for First Come First Serve Algorithm</h1>
    <h1>Processes {{ this.selectorData }}</h1>
    <main id="simulator">
      <!-- Respective sections for respective components -->
      <section id="algorithm-selection">
        <algorithm-selector @select-processes="algoSelection" />
      </section>

      <!-- Processes should be dynamically inserted after data is emitted from algorithm selector -->
      <section id="processes">
        <process class="el p1" :pid="1"></process>
        <process class="el p2" :pid="2"></process>
        <process class="el p3" :pid="3"></process>
      </section>
      <section id="cpu"><div id="box">CPU</div></section>
    </main>
    <button @click="animateProcesses()" id="restart-btn">
      Restart Simulation
    </button>
  </div>
</template>
<script>
import AlgoritmSelector from "../components/AlgorithmSelector/AlgorithmSelector.vue";
import Process from "../components/Process/Process.vue";
import { SJF } from "../controllers/processorAlgos";

import anime from "animejs";

export default {
  components: {
    "algorithm-selector": AlgoritmSelector,
    process: Process,
  },

  data() {
    return {
      timeline: null,
      duration: null,
      processes: 0,
      selectorData: 0,
    };
  },
  methods: {
    /**
     * Temporary method for animating all processes
     */
    animateProcesses() {
      // Each process algo will have a different animation stored in animations.js
      const processes = [
        {
          pid: 1,
          burstTime: 2,
          arrival: 2,
        },
        {
          pid: 2,
          burstTime: 5,
          arrival: 3,
        },
        {
          pid: 3,
          burstTime: 3,
          arrival: 1,
        },
      ];
      const myqueue = new SJF(processes);
      const testAnimationTimeline = myqueue.generateTimeline();
      // console.log(testAnimationTimeline);
      // Insert animation for each process
      for (let animation of testAnimationTimeline) {
        this.timeline.add(animation);
      }
    },

    algoSelection(selectorData) {
      console.log(selectorData);
      this.selectorData = selectorData;
    },
  },

  mounted() {
    // Anime.js timeline can only be initalized in created() or mounted() lifecycle method
    this.timeline = anime.timeline({
      easing: "easeOutExpo",
      duration: 3000, // Represents total burst time. Individual times can be subdivisions of this value
    });
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

#cpu {
  display: flex;
  align-items: center;
  justify-content: center;
}

#box {
  height: 150px;
  width: 200px;
  background-color: #f5f5f5;
  color: #282828;
}
</style>
