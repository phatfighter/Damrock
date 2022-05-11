<template>
  <table class="holder">
    <tr>
      <td :key="button.name" v-for="button in getMenubarButtons">
        <MenubarButton :name="button.name" size="24" />
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

import MenubarButton from "../components/MenubarButton.vue";

export default {
  name: "Menubar",
  components: {
    MenubarButton,
  },
  computed: mapGetters({
    getMenubarButtons: "buttons/menubarButtons/getMenubarButtons",
  }),
};
</script>

<style scoped>
.holder {
  padding-top: 0px;
  margin-left: 0px;
}
</style>
