<template>
  <div id="container">
    <h1 v-if="algorithm">Simulation for {{ algorithm }} Algorithm</h1>
    <h1 v-else>Processor Scheduling Algorithm Simulator</h1>
    <main id="simulator">
      <!-- Respective sections for respective components -->
      <section id="algorithm-selection">
        <algorithm-selector
          @animation-data="setAnimation"
          @select-processes="algoSelection"
        />
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
      <section id="cpu">
        <h3>Processor</h3>
        <div id="box"><img src="@/assets/Logo(1).svg" /></div>
      </section>
    </main>
    <button @click="animateProcesses()" id="restart-btn">
      Start Simulation
    </button>
  </div>
</template>
<script>
import AlgoritmSelector from "../components/AlgorithmSelector/AlgorithmSelector.vue";
import Process from "../components/Process/Process.vue";
// import { PriorityScheduling } from "../controllers/processorAlgos";
// import { SJF } from "../controllers/processorAlgos";
// import { FCFS } from "../controllers/processorAlgos";

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
        algorithm: "",
        processes: [],
      },
      animation: [], // Animation emitted
      animationCompleted: false,
    };
  },
  methods: {
    /**
     * Main method for driving animation
     */
    animateProcesses() {
      // If timeline is empty don't animate
      if (this.animation.length === 0) {
        return;
      }
      // Each process algo will have a different animation stored in animations.js
      if (this.animationCompleted === true) {
        this.timeline.restart();
        this.animationCompleted = false;
      }
      console.log("This is the data: ", this.selectorData.processes);
      // const processes = [
      //   {
      //     pid: 1,
      //     burstTime: 2,
      //     arrival: 2,
      //   },
      //   {
      //     pid: 2,
      //     burstTime: 5,
      //     arrival: 3,
      //   },
      //   {
      //     pid: 3,
      //     burstTime: 3,
      //     arrival: 1,
      //   },
      // ];
      // const myqueue = new PriorityScheduling(processes);
      // myqueue.sortqueue((a, b) => a.priority - b.priority);
      /* const myqueue = new PriorityScheduling(this.selectorData.processes);
      console.log(myqueue);
      const testAnimationTimeline = myqueue.generateTimeline();
      console.log(testAnimationTimeline); */
      // Insert animation for each process
      for (let animation of this.animation) {
        this.timeline.add(animation);
      }

      this.animationCompleted = true;
    },

    algoSelection(selectorData) {
      console.log(selectorData);
      this.selectorData = selectorData;
    },

    setAnimation(animationData) {
      console.log("Timeline emitted", animationData);
      this.animation = animationData;
      console.log("Processes: ", this.selectorData.processes);
    },
  },
  computed: {
    algorithm() {
      return this.selectorData.algorithm;
    },
  },

  mounted() {
    // Anime.js timeline can only be initalized in created() or mounted() lifecycle method
    this.algoSelection();
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
  gap: 10px;
}

#cpu {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#cpu h3 {
  margin-bottom: 15px;
}
#box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 150px;
  background: radial-gradient(
    100% 100% at 0% 0%,
    #86be43 0%,
    rgba(134, 190, 67, 0.4) 100%
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  border: 1px solid #86be43;
  box-sizing: border-box;
  border-radius: 5px;
  color: #282828;
}

#box img {
  height: 80px;
  width: 80px;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
