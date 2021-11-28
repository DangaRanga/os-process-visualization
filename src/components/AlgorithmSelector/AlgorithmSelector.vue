<template>
  <div>
    <form v-if="first_step">
      <h3>Select Algorithm</h3>
      <div class="input-field">
        <label for="algorithm-type">Select Algorithm </label>
        <select v-model="algorithm" class="algorithm-select">
          <option disabled value="">Please select one</option>
          <option value="fcfs">First Come First Served</option>
          <option value="priority_scheduling">Priority Scheduling</option>
          <option value="round_robin">Round Robin</option>
          <option value="shortest_job">Shortest Job First</option>
        </select>
      </div>
      <div class="input-field">
        <label for="no-processes">Number of Processes </label>
        <input type="number" v-model="noProcesses" />
      </div>
      <div class="input-field" v-if="algorithm === 'round_robin'">
        <label for="no-processes">Quantum</label>
        <input type="number" v-model="quantum" />
      </div>
      <button type="button" @click="emitProcesses">Next Step</button>
    </form>
    <form v-if="second_step">
      <h3>Add burst times</h3>
      <div
        class="input-field"
        v-for="(burstTime, index) in processes.length"
        :key="burstTime"
      >
        <label for="no-processes">Burst Time for P{{ burstTime }} </label>
        <input type="number" @input="burstTimeInputHandler(index, $event)" />
      </div>
      <div class="input-field" v-if="algorithm === 'round_robin'">
        <label for="no-processes">Quantum</label>
        <input type="number" v-model="quantum" />
      </div>
      <div id="button_group">
        <button type="button" @click="prevStep">Prev Step</button>
        <button type="button" @click="emitProcesses">Start Animation</button>
      </div>
    </form>
  </div>
</template>
<script>
import { Process } from "../../models/process";
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
      algorithm: null,
      processes: [],
      noProcesses: 0,
      quantum: 0,
      first_step: true,
      second_step: false,
      animation: {},
    };
  },

  methods: {
    /**
     * Sends over process data to display current processes
     * then toggles next step in form
     */
    emitProcesses() {
      console.log("Emitting data");
      this.generateProcesses();
      this.nextStep();
      console.log(this.noProcesses);
      console.log(this.processes);
      this.$emit("select-processes", this.processes);
    },

    /**
     * Initializes all processes
     */
    generateProcesses() {
      this.processes = [];

      // Prevents more than 5 processes from being added
      if (this.noProcesses > 5) {
        // Alert that input is invalid
        return;
      }

      for (let i = 0; i < this.noProcesses; i++) {
        // Initialize all burst times as 0
        this.processes.push(new Process(i + 1, 0, 0));
      }
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

    determineAnimation() {
      switch (this.algorithm) {
        case "fcfs": {
          const fcfsAlgo = FCFS(this.processes);
          return fcfsAlgo.generateTimeline();
        }

        case "round_robin": {
          const roundRobinAlgo = RoundRobin(this.processes, this.quantum);
          return roundRobinAlgo.generateTimeline();
        }

        case "priority": {
          const prioritySchedulAlgo = PriorityScheduling(this.processes);
          return prioritySchedulAlgo.generateTimeline();
        }

        case "shortest_job": {
          const shortestJobAlgo = SJF(this.processes);
          return shortestJobAlgo.generateTimeline();
        }

        default:
          // Alert that algorithm wasn't selected
          console.log("Select an algorithm in step");
      }
    },
    nextStep() {
      if (this.noProcesses < 2) {
        // Alert that two or more processes should be entered
        console.log("More than 1 process should be entered");
      } else {
        this.first_step = false;
        this.second_step = true;
      }
    },
    prevStep() {
      console.log;
      this.first_step = true;
      this.second_step = false;
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
