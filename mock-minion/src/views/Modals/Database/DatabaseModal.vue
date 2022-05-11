<template>
  <div>
    <div class="modal-dbname">
      <div>
        <label>Name</label>
      </div>
      <div>
        <input
          type="text"
          class="dbName"
          name="text"
          :value="dbName"
          @input="updateName"
        />
      </div>
    </div>
    <div class="modal-apischema">
      <div>
        <label>Type</label>
      </div>
      <div class="Droplist">
        <select name="type" id="type" @input="updateType">
          <option
            v-for="item in this.getTypeList()"
            :key="item"
            :value="item"
            :selected="item === type"
            @input="this.updateType"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <ModalButtons @save="this.save" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalButtons from "../ModalButtons.vue";
import { DatabaseEnums } from "@/model/enums/databaseEnums.js";

export default {
  name: "Database",
  computed: {
    ...mapGetters({ getCanvasObject: "modals/getCanvasObject" }),
    dbName: {
      get() {
        return this.getCanvasObject.mmState.name;
      },
    },
    type: {
      get() {
        return this.getCanvasObject.mmState.dbType;
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
    getTypeList() {
      return DatabaseEnums.getList();
    },
    updateName(e) {
      this.getCanvasObject.mmState.name = e.target.value;
    },
    updateType(e) {
      this.getCanvasObject.mmState.dbType = e.target.value;
    },
    save() {
      this.refresh();
    },
  },
};
</script>

<style scoped>
.modal-dbname {
  padding-bottom: 16px;
  align-content: center;
}

.dbName {
  width: 100%;
}
.type {
  width: 100%;
}
</style>
