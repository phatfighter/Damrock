<template>
  <div class="container">
    <div class="Title">MockMinion</div>
    <div class="Menubar">
      <Menubar />
    </div>
    <div class="Workspace" id="workspace">
      <Workspace />
    </div>

    <div class="Toolbar">
      <Toolbar />
    </div>
    <div class="Version">v0.1</div>
    <div class="Statusbar">{{ this.getSelectedToolbarButton }} selected</div>
    <div class="ObjectBar">{{ this.getSelectedObject }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Toolbar from "./Toolbar.vue";
import Menubar from "./Menubar.vue";
import Workspace from "./Workspace.vue";

export default {
  name: "Dashboard",
  components: {
    Toolbar,
    Menubar,
    Workspace,
  },
  computed: {
    ...mapGetters({
      getSelectedToolbarButton:
        "buttons/toolbarButtons/getSelectedToolbarButton",
    }),
    ...mapGetters({ getCanvasObject: "modals/getCanvasObject" }),
    getSelectedObject() {
      if (this.getCanvasObject == null) {
        return "None selected";
      }
      return this.getCanvasObject.mmState;
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 64px 128px auto;
  grid-template-rows: 36px auto 48px;
  gap: 0px 0px;
  grid-template-areas:
    "Title Title Menubar"
    "Toolbar Workspace Workspace"
    "Version Statusbar ObjectBar";
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
.Title {
  grid-area: Title;
  border-style: solid;
  overflow: auto;
}
.Menubar {
  grid-area: Menubar;
  border-style: solid;
  overflow: auto;
}
.Workspace {
  grid-area: Workspace;
  border-style: solid;
  overflow: auto;
}
.Toolbar {
  grid-area: Toolbar;
  border-style: solid;
  overflow: auto;
}
.Version {
  grid-area: Version;
  border-style: solid;
  text-align: center;
  overflow: auto;
}
.Statusbar {
  grid-area: Statusbar;
  border-style: solid;
  overflow: auto;
}
.ObjectBar {
  grid-area: ObjectBar;
  border-style: solid;
  overflow: auto;
}
</style>
