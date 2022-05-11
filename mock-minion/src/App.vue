<template>
  <Dashboard />
</template>

<script>
import Dashboard from "./views/Dashboard.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Karla:wght@200&display=swap");
* {
  font-family: "Karla", sans-serif;
}
</style>
