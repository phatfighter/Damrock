<template>
  <div class="container">
    <div class="Droplist">
      <select name="type" id="type">
        <option
          v-for="item in this.getRestList"
          :key="item"
          :value="item"
          :selected="item === apiType"
        >
          {{ item }}
        </option>
      </select>
    </div>
    <div class="Endpoint">
      <input type=" text" id="endpointText" name="endpointText" :value="path" />
    </div>
    <div class="Options">N/A</div>
    <div class="Remove" @click="deleteApiFunction(id)">
      <i class="fa-solid fa-circle-minus"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ApiEndpoint",
  props: {
    id: {
      type: Number,
      default: -1,
    },
    apiType: {
      type: String,
      default: "Get",
    },
    path: String,
    schema: String,
  },
  computed: mapGetters({ getRestList: "components/api/getRestList" }),
  methods: {
    ...mapActions({ deleteApiFunction: "components/api/deleteApiFunction" }),
  },
};
</script>

<style scope>
.container {
  display: grid;
  grid-template-columns: 64px auto auto auto;
  grid-template-rows: 32px;
  gap: 8px 8px;
  grid-template-areas: "Droplist Endpoint Options Remove";
}

.Droplist {
  grid-area: Droplist;
  text-align: center;
}

.Endpoint {
  grid-area: Endpoint;
  text-align: center;
}

.Options {
  grid-area: Options;
  text-align: center;
}

.Remove {
  grid-area: Remove;
  text-align: center;
}
.fa-circle-minus {
  color: rgb(128, 0, 0);
}
.fa-circle-minus:hover {
  color: red;
}
</style>
