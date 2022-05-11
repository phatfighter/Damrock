<template>
  <div class="holder">
    <div :key="button.name" v-for="button in getToolbarButtons">
      <ToolbarButton :name="button.name" size="48" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ToolbarButton from "../components/ToolbarButton.vue";

export default {
  name: "Toolbar",
  components: {
    ToolbarButton,
  },
  computed: mapGetters({
    getToolbarButtons: "buttons/toolbarButtons/getToolbarButtons",
  }),
};
</script>

<style scoped>
.holder {
  padding-top: 8px;
  padding-left: 5px;
}
</style>
