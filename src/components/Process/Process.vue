<template>
  <article>
    <p>{{ `P${pid}` }}</p>
    <div id="proces-body">{{ burstTime }}ms</div>
  </article>
</template>
<script>
import anime from "animejs";
export default {
  name: "Process",

  // Props to be displayed for respective algorithm
  props: ["pid", "burstTime", "arrivalTime", "priority"],

  created() {
    console.log("Created process");
    const timeline = anime.timeline({
      duration: 3000,
    });

    timeline.add({
      scaleY: 10,
      scaleX: 10,
    });

    timeline.add({
      scaleY: 0,
      scaleX: 0,
    });
  },
};
</script>
<style scoped>
article {
  margin: 0 5%;
  animation: pop-in 0.8s ease;
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
