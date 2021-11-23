<template>
  <form>
    <h3>Select Algorithm</h3>
    <div id="input-field">
      <label for="algorithm-type">Select Algorithm </label>
    </div>
  </form>
</template>
<script>
export default {
  name: "AlgoritmSelector",
  data() {
    return {
      selected: null,
      options: [{ value: "null", text: "Please select an option" }],
    };
  },
};
</script>
<style scoped></style>
