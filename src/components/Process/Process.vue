<template>
  <article>
    <p>{{ `P${pid}` }}</p>
    <div id="proces-body"></div>
  </article>
</template>
<script>
export default {
  name: "Process",

  // Props to be displayed for respective algorithm
  props: ["pid", "burstTime", "arrivalTime", "priority"],
};
</script>
<style scoped>
article {
  margin: 0 5%;
  transition: ease-in-out 0.5s;
}

div {
  height: 50px;
  width: 50px;

  background: #df4f4f;
}
</style>
