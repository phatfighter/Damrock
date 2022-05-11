<template>
  <circle />
</template>

<script>
export default {
  inject: ["provider"],
  name: "ApiComponent",
  props: {
    x: String,
    y: String,
    name: String,
    size: {
      type: Number,
      default: 48,
    },
    color: {
      type: String,
      default: "#888888",
    },
  },
  updated() {
    console.log("Hi");
    if (!this.provider.context) return;

    console.log("Drawing");
    let context = this.provider.context;

    context.beginPath();
    context.moveTo(
      this.x + this.size * Math.cos(0),
      this.y + this.size * Math.sin(0)
    );

    for (var side = 0; side < 7; side++) {
      context.lineTo(
        this.x + this.size * Math.cos((side * 2 * Math.PI) / 6),
        this.y + this.size * Math.sin((side * 2 * Math.PI) / 6)
      );
    }

    context.fillStyle = this.color;
    context.fill();

    context.font = "12px sans-serif";
    context.fillStyle = "#000000";
    let metrics = context.measureText(name);
    let fontHeight =
      metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    context.fillText(
      name,
      this.x - metrics.width / 2,
      this.y + fontHeight / 2,
      100
    );
  },
};
</script>

<style></style>
