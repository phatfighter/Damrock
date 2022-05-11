<template>
  <div>
    <div class="modal-topicname">
      <div>
        <label>Name</label>
      </div>
      <div>
        <input
          type="text"
          class="topicName"
          name="text"
          :value="topicName"
          @input="updateName"
        />
      </div>
    </div>
    <ModalButtons @save="this.save" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalButtons from "../ModalButtons.vue";

export default {
  name: "TopicModal",
  computed: {
    ...mapGetters({ getCanvasObject: "modals/getCanvasObject" }),
    topicName: {
      get() {
        return this.getCanvasObject.mmState.name;
      },
    },
  },
  components: {
    ModalButtons,
  },
  props: {
    show: Boolean,
  },
  methods: {
    ...mapActions({ refresh: "modals/refresh" }),
    updateName(e) {
      this.getCanvasObject.mmState.name = e.target.value;
    },
    save() {
      this.refresh();
    },
  },
};
</script>

<style scoped>
.modal-topicname {
  padding-bottom: 16px;
  align-content: center;
}

.topicName {
  width: 100%;
}
</style>
