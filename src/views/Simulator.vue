<template>
  <div id="container">
    <h1 v-if="selectorData.algorithm">
      Simulation for {{ selectorData.algorithm }} Algorithm
    </h1>
    <h1 v-else>Processor Scheduling Algorithm Simulator</h1>
    <h4>No Processes: {{ this.selectorData.processes.length }}</h4>
    <main id="simulator">
      <!-- Respective sections for respective components -->
      <section id="algorithm-selection">
        <algorithm-selector @select-processes="algoSelection" />
      </section>

      <!-- Processes should be dynamically inserted after data is emitted from algorithm selector -->
      <section id="processes">
        <process
          v-for="process in selectorData.processes"
          :class="'p' + process.pid"
          :key="process.pid"
          :pid="process.pid"
          :burstTime="process.burstTime"
        ></process>
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
// import { PriorityScheduling } from "../controllers/processorAlgos";
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
      selectorData: {
        algorithm: null,
        processes: [],
      },
      animationCompleted: false,
    };
  },
  methods: {
    /**
     * Main method for driving animation
     */
    animateProcesses() {
      // Each process algo will have a different animation stored in animations.js
      if (this.animationCompleted === true) {
        this.timeline.restart();
        this.animationCompleted = false;
      }

      const processes = [
        {
          pid: 1,
          burstTime: 5,
          // priority: 2,
        },
        {
          pid: 2,
          burstTime: 4,
          // priority: 1,
        },
        {
          pid: 3,
          burstTime: 3,
          // priority: 4,
        },
      ];
      // const myqueue = new PriorityScheduling(processes);
      // myqueue.sortqueue((a, b) => a.priority - b.priority);
      const myqueue = new SJF(processes);
      const testAnimationTimeline = myqueue.generateTimeline();
      // Insert animation for each process
      for (let animation of testAnimationTimeline) {
        this.timeline.add(animation);
      }

      this.animationCompleted = true;
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
      // Represents total burst time. Individual times can be subdivisions of this value
    });
  },
};
</script>
<style scoped>
#container {
  text-align: center;
  height: 100vh;
  background: #282828;
}

#container h1 {
  margin: 2% 0;
}
#simulator {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  animation: fade-in 0.8s ease-in-out;
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
