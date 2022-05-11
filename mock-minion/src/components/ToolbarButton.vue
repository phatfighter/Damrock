<template>
  <IconLoader
    :class="this.isToolbarButtonSelected(name) ? 'selected' : 'unselected'"
    :name="name"
    :size="size"
    @click="this.toggleSelectedToolbarButton(name)"
  />
</template>

<script>
import IconLoader from "./IconLoader.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ToolbarButton",
  props: {
    name: String,
    size: {
      type: String,
      default: "32",
    },
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconLoader,
  },
  methods: {
    ...mapActions({
      toggleSelectedToolbarButton:
        "buttons/toolbarButtons/toggleSelectedToolbarButton",
    }),
  },
  computed: mapGetters({
    isToolbarButtonSelected: "buttons/toolbarButtons/isToolbarButtonSelected",
  }),
};
</script>

<style scoped>
.selected {
  display: inline-block;
  border-style: solid;
  border-color: #000;
  border-width: 1;
  background-color: #4444ff;
}
.unselected {
  display: inline-block;
  border-style: solid;
  border-color: #000;
  border-width: 1;
  background-color: #999999;
}
</style>
