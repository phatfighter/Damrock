<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">{{ this.name }}</div>
          <br />
          <ApiModal v-show="this.showAPI" />
          <DatabaseModal v-show="this.showDatabase" />
          <ServiceModal v-show="this.showService" />
          <ConnectionModal v-show="this.showConnection" />
          <TopicModal v-show="this.showTopic" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ButtonEnums } from "../../model/enums/buttonEnums.js";
import ApiModal from "./Api/ApiModal.vue";
import DatabaseModal from "./Database/DatabaseModal.vue";
import ServiceModal from "./Service/ServiceModal.vue";
import ConnectionModal from "./Connection/ConnectionModal.vue";
import TopicModal from "./Topic/TopicModal.vue";

export default {
  name: "ModalWrapper",
  props: {
    show: Boolean,
    name: String,
  },
  components: {
    ApiModal,
    DatabaseModal,
    ServiceModal,
    ConnectionModal,
    TopicModal,
  },
  computed: {
    showAPI() {
      return this.name === ButtonEnums.Api;
    },
    showDatabase() {
      return this.name === ButtonEnums.Database;
    },
    showService() {
      return this.name === ButtonEnums.Service;
    },
    showConnection() {
      return this.name === ButtonEnums.Connection;
    },
    showTopic() {
      return this.name === ButtonEnums.Topic;
    },
  },
};
</script>

<style scoped>
/* {
  font-family: "Karla", sans-serif;
}*/
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-header {
  margin-top: 0;
  text-align: center;
  color: #42b983;
  font-size: 20px;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-buttons {
  padding-bottom: 16px;
}

.modal-default-button {
  float: right;
  margin: 8px;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
