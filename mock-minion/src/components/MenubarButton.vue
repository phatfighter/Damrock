<template>
  <IconLoader
    class="menubarButton"
    :name="name"
    :size="size"
    @click="this.clickButton(name)"
  />
</template>

<script>
import IconLoader from "./IconLoader.vue";
import { mapActions } from "vuex";

export default {
  name: "MenubarButton",
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
    ...mapActions({ clickButton: "buttons/menubarButtons/clickButton" }),
  },
};
</script>

<style scoped>
.menubarButton {
  display: inline-block;
  border-style: solid;
  border-color: #000;
  border-width: 1;
  background-color: #999999;
}
</style>
