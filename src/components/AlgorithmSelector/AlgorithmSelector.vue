<template>
  <div>
    <form v-if="step === 1">
      <h3>Select Algorithm</h3>
      <div class="input-field">
        <label for="algorithm-type">Select Algorithm </label>

        <!-- Map out scheduling algorithms -->
        <select v-model="algorithm" class="algorithm-select">
          <option disabled value="">Please select one</option>
          <option
            v-for="(algorithm, index) in algorithms"
            :key="index"
            :value="{ text: algorithm.text, value: algorithm.value }"
          >
            {{ algorithm.text }}
          </option>
        </select>
      </div>
      <div class="input-field">
        <label for="no-processes">Number of Processes </label>
        <input type="number" v-model="noProcesses" />
      </div>

      <!-- Map out the process orders from comptued property -->
      <div
        class="input-field"
        v-if="(algorithm.value === 'fcfs') & (noProcesses > 1)"
      >
        <label for="process-order">Process Order </label>
        <select v-model="processOrder">
          <option disabled value="">Please a process order</option>
          <option
            v-for="(combination, index) in processCombinations"
            :key="index"
            :value="combination.value"
          >
            {{ combination.text }}
          </option>
        </select>
      </div>

      <!-- Display quantum time only if Round Robin is the algorithm -->
      <div class="input-field" v-if="algorithm.value === 'round_robin'">
        <label for="no-processes">Quantum</label>
        <input type="number" v-model="quantum" />
      </div>
      <button type="button" @click="emitProcesses">Next Step</button>
    </form>

    <!-- Display the second page of the form -->
    <form v-if="step === 2">
      <h3>Add burst times</h3>
      <div
        class="input-field"
        v-for="(burstTime, index) in processes.length"
        :key="burstTime"
      >
        <label for="no-processes">Burst Time for P{{ burstTime }} </label>
        <input type="number" @input="burstTimeInputHandler(index, $event)" />
      </div>
      <div id="button_group">
        <button type="button" @click="prevStep">Prev Step</button>
        <button
          v-if="algorithm.value === 'priority_scheduling'"
          @click="nextStep"
        >
          Next Step
        </button>
        <button v-else type="button" @click="emitAnimation">
          Create Animation
        </button>
      </div>
    </form>

    <!-- Display the third page of the form if priority scheduling and third step -->
    <form v-if="(algorithm.value === 'priority_scheduling') & (step === 3)">
      <h3>Add Process Priorities</h3>
      <div
        class="input-field"
        v-for="(priority, index) in processes.length"
        :key="index"
      >
        <label for="no-processes">Priority for for P{{ priority }} </label>
        <input type="number" @input="priorityInputHandler(index, $event)" />
      </div>
      <div id="button_group">
        <button type="button" @click="prevStep">Prev Step</button>
        <button type="button" @click="emitAnimation">Create Animation</button>
      </div>
    </form>
  </div>
</template>
<script>
import { Process } from "../../models/process";
import { permutations } from "../../util/permutations";
import { schedulingAlgorithms } from "../../util/constants";
import {
  dangerNotification,
  successNotification,
} from "../../util/notifications";

import {
  RoundRobin,
  SJF,
  FCFS,
  PriorityScheduling,
} from "../../controllers/processorAlgos";

export default {
  name: "AlgorithmSelector",
  data() {
    return {
      algorithm: {
        text: null,
        value: null,
      },
      algorithms: schedulingAlgorithms,
      processes: [],
      noProcesses: 0,
      quantum: 0,
      step: 1,
      animation: [],
      processOrder: [1, 2, 3], // Default in ascending order
    };
  },

  computed: {
    processCombinations() {
      // Generate array with PIDs
      const pidArray = [];
      for (let i = 0; i < this.noProcesses; i++) {
        pidArray.push(i + 1);
      }

      // Generate permutations of PIDS
      const pidPermutations = permutations(pidArray);

      // Push object representation and string representation to be stored in v-model
      const processCombinations = [];
      for (let permutation of pidPermutations) {
        // Turns array to string i.e) [1,2,3] to "1,2,3"
        let permStr = permutation.join(",");
        processCombinations.push({ value: permutation, text: permStr });
      }
      return processCombinations;
    },
  },
  methods: {
    /**
     * Sends over process data and scheduling algorithm to parent
     * to allow for data to be rendered then triggers next step in form
     */
    emitProcesses() {
      console.log("Emitting data");

      if (!this.algorithm.text) {
        dangerNotification("Please select an algorithm");
        return;
      }
      // Initialize the processes
      const generationResult = this.generateProcesses();
      if (generationResult !== true) {
        return;
      }

      this.nextStep();

      // console.log(this.noProcesses);
      // console.log(this.processes);

      // Sends process and algorithm data to parent
      this.$emit("select-processes", {
        processes: this.processes,
        algorithm: this.algorithm.text,
        processOrder: this.processOrder,
      });
    },

    /**
     * Sends all data required for the animation after
     */
    emitAnimation() {
      this.determineAnimation();
      successNotification(
        "Animation Created, Begin simulation by clicking 'Start Simulation'"
      );
      this.$emit("animation-data", this.animation);
    },

    /**
     * Initializes all processes
     */
    generateProcesses() {
      this.processes = [];

      // Prevents more than 5 processes from being added
      if (this.noProcesses > 5) {
        dangerNotification("No more than 5 processes can be selected");
        return false;
      }

      for (let i = 0; i < this.noProcesses; i++) {
        // Initialize all burst times as 0
        this.processes.push(new Process(i + 1, 0, 0));
      }
      return true;
    },

    burstTimeInputHandler(index, e) {
      // Assign burst time to process
      const inputTime = parseInt(e.target.value);
      if (Number.isInteger(inputTime)) {
        this.processes[index].burstTime = parseInt(inputTime);
      } else {
        this.processes[index].burstTime = 0;
      }

      console.log(this.processes);
    },

    priorityInputHandler(index, e) {
      // Assign priorities to process
      const inputTime = parseInt(e.target.value);
      console.log("Setting priority");
      if (Number.isInteger(inputTime)) {
        console.log("Priority set");
        this.processes[index].priority = parseInt(inputTime);
      } else {
        this.processes[index].priority = 0;
      }

      console.log(this.processes);
    },

    determineAnimation() {
      switch (this.algorithm.value) {
        case "fcfs": {
          const fcfsAlgo = new FCFS(this.processes);
          this.animation = fcfsAlgo.generateTimeline();
          break;
        }

        case "round_robin": {
          const roundRobinAlgo = new RoundRobin(this.processes, this.quantum);
          this.animation = roundRobinAlgo.generateTimeline();
          break;
        }

        case "priority_scheduling": {
          const prioritySchedulAlgo = new PriorityScheduling(this.processes);
          this.animation = prioritySchedulAlgo.generateTimeline();
          break;
        }

        case "shortest_job": {
          const shortestJobAlgo = new SJF(this.processes);
          this.animation = shortestJobAlgo.generateTimeline();
          break;
        }

        default:
          // Alert that algorithm wasn't selected
          console.log("Select an algorithm in step");
      }
    },
    nextStep() {
      console.log(this.algorithm);
      if (this.noProcesses < 2) {
        // Alert that two or more processes should be entered
        dangerNotification("More than 1 process should be entered");
      } else {
        this.step += 1;
      }
    },
    prevStep() {
      this.step -= 1;
    },
  },
};
</script>
<style scoped>
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 1px solid #86be43;
  padding: 10px 0px;
  margin: 0 5%;
  border-radius: 10px;
}

button {
  background: #86be43;
  padding: 10px 25px;
  border: none;
  color: #ffff;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  outline: none;
  margin: 20;
}

#button_group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90%;
}

button:hover {
  background: #4a632b;
  cursor: pointer;
}

h3 {
  margin: 2% 0;
}
.input-field {
  margin: 5% 0;

  display: flex;
  flex-direction: column;
  text-align: left;
  width: 80%;
}

label {
  font-size: 0.8em;
  color: #a7a7a7;
}
select,
input {
  margin-top: 2%;
  border: 1px solid #86be43;
  padding: 10px 15px;
  background-color: #282828;
  color: #ffff;
  border-radius: 5px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
