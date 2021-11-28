<template>
  <form>
    <h3>Select Algorithm</h3>
    <div class="input-field">
      <label for="algorithm-type">Select Algorithm </label>
      <select v-model="selected" class="algorithm-select">
        <option disabled value="">Please select one</option>
        <option>First Come First Served</option>
        <option>Priority Scheduling</option>
        <option>Round Robin</option>
        <option>Shortest Job First</option>
      </select>
    </div>
    <div class="input-field">
      <label for="no-processes">Number of Processes </label>
      <input type="number" v-model="noProcesses" />
    </div>
    <button type="button" @click="emitProcesses">Next Step</button>
  </form>
</template>
<script>
export default {
  name: "AlgorithmSelector",
  data() {
    return {
      selected: null,
      processes: [],
      noProcesses: 0,
    };
  },

  methods: {
    emitProcesses() {
      console.log("Emitting data");
      console.log(this.noProcesses);
      this.$emit("select-processes", this.noProcesses);
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
