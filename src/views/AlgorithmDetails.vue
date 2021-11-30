<template>
  <div class="container">
    <h1>{{ details.name }}</h1>
    <div class="description">
      <h2>How it Works</h2>
      <div id="content">
        <p>{{ details.description }}</p>
        <div id="process-gif"><img :src="getImgUrl(details.gif)" /></div>
      </div>
    </div>
    <div class="reasons">
      <div id="advantages">
        <h2>Advantages</h2>
        <ol>
          <li v-for="(detail, index) in details.pros" :key="index">
            {{ detail }}
          </li>
        </ol>
      </div>
      <div id="disadvantages">
        <h2>Disadvantages</h2>
        <ol>
          <li v-for="(detail, index) in details.cons" :key="index">
            {{ detail }}
          </li>
        </ol>
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
  methods: {
    getImgUrl(pic) {
      return require("../assets" + pic);
    },
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

img {
  border-radius: 5px;
  /* Base Screen 1 */

  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.28));
}
#content,
.reasons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.reasons {
  margin: 8% 0;
}

p,
li {
  width: 80%;
}

p,
li {
  line-height: 1.7em;
  font-size: 0.9em;
  color: #d0d0d0;
}

li {
  margin: 2% 2.5%;
}
</style>
