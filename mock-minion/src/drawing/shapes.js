var shapes = {
  drawLine(context, x, y) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineWidth = 1;
    context.strokeStyle = "rgba(6, 6, 6, 1)";
    context.lineTo(x + 100, y + 100);
    context.stroke();
  },
};

export default shapes;
