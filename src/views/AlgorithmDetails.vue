<template>
  <div class="container">
    <h1>{{ details.name }}</h1>
    <div class="description">
      <h2>How it Works</h2>
      <div id="content">
        <p>{{ details.description }}</p>
        <div id="process-gif"></div>
      </div>
    </div>
    <div class="reasons">
      <div id="advantages">
        <h2>Advantages</h2>
        <p>{{ details.pros }}</p>
      </div>
      <div id="disadvantages">
        <h2>Disadvantages</h2>
        <p>{{ details.cons }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { algorithmDetails } from "@/util/constants";

export default {
  name: "AlgorithmDetails",
  props: ["name"],

  data() {
    return {};
  },

  mounted() {
    console.log(this.name);
  },

  computed: {
    details() {
      const details = algorithmDetails[this.name];
      console.log(details);
      return details;
    },
  },
};
</script>
<style scoped>
.container {
  margin: 4% 2%;
}
.container h2 {
  margin: 2% 0;
  font-size: 1.5em;
}

#content,
.reasons {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.reasons {
  margin: 8% 0;
}

p {
  width: 80%;
}

p {
  line-height: 1.7em;
  font-size: 0.9em;
  color: #d0d0d0;
}
</style>
