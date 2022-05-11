<template>
  <img
    :width="size"
    :height="size"
    :src="require('@/assets/buttons/' + name + 'Button.svg')"
  />
</template>

<script>
export default {
  name: "IconLoader",
  props: {
    name: String,
    size: {
      type: String,
      default: "32",
    },
  },
};
</script>

<style scoped></style>
