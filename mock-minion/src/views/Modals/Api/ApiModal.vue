<template>
  <div>
    <div class="modal-apiname">
      <div>
        <label>Name</label>
      </div>
      <div>
        <input
          type="text"
          class="apiName"
          name="text"
          :value="apiName"
          @input="updateName"
        />
      </div>
    </div>
    <div class="modal-apischema">
      <div>
        <label>OpenAPI Schema (YAML)</label>
      </div>
      <div>
        <textarea
          class="schema"
          id="schemaId"
          name="schema"
          rows="10"
          :value="schema"
          @input="updateSchema"
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
  name: "ApiModal",
  computed: {
    ...mapGetters({ getCanvasObject: "modals/getCanvasObject" }),
    apiName: {
      get() {
        return this.getCanvasObject.mmState.name;
      },
    },
    schema: {
      get() {
        return this.getCanvasObject.mmState.schema;
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
    updateSchema(e) {
      this.getCanvasObject.mmState.schema = e.target.value;
    },
    save() {
      this.refresh();
    },
  },
};
</script>

<style scoped>
.modal-apiname {
  padding-bottom: 16px;
  align-content: center;
}

.apiName {
  width: 100%;
}
.schema {
  width: 100%;
  resize: none;
}
</style>
