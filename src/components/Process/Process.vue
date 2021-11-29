<template>
  <article>
    <p>{{ `P${pid}` }}</p>
    <div id="proces-body">{{ burstTime }}ms</div>
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
  animation: pop-in 0.8s ease-in-out;
  transition: ease-in-out 0.5s;
}

div {
  height: 50px;
  width: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #df4f4f;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
