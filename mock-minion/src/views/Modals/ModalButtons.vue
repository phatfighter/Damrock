<template>
  <div class="modal-buttons">
    <button class="modal-default-button" @click="this.actionAndClose('cancel')">
      Cancel
    </button>
    <button class="modal-default-button" @click="this.actionAndClose('save')">
      Ok
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ModalButtons",
  emits: ["cancel", "save"],
  methods: {
    ...mapActions({ setModalVisible: "modals/setVisible" }),
    actionAndClose(action) {
      this.$emit(action);
      this.setModalVisible(false);
    },
  },
};
</script>

<style scoped>
.modal-buttons {
  padding-bottom: 16px;
}

.modal-default-button {
  float: right;
  margin: 8px;
}
</style>
