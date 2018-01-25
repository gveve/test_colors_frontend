import { v4 } from 'uuid';

export const TOOL_ELLIPSE = 'ellipse';

export default (context) => {
  let ellipse = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size, fill, fill2) => {

    ellipse = {
      id: v4(),
      tool: TOOL_ELLIPSE,
      color,
      size,
      fill,
      fill2,
      start: { x, y },
      end: null
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [ellipse];
  };

  const drawEllipsePolifyll = (centerX, centerY, radiusX, radiusY) => {
    let xPos;
    let yPos;
    let i = 0;
    for (i; i < 2 * Math.PI; i += 0.01) {
      xPos = centerX - (radiusY * Math.sin(i)) * Math.sin(0) + (radiusX * Math.cos(i)) * Math.cos(0);
      yPos = centerY + (radiusX * Math.cos(i)) * Math.sin(0) + (radiusY * Math.sin(i)) * Math.cos(0);
      if (i === 0) {
        context.moveTo(xPos, yPos);
      } else {
        context.lineTo(xPos, yPos);
      }
    }
  };

  const drawEllipse = (item, mouseX, mouseY) => {
    const startX = mouseX < item.start.x ? mouseX : item.start.x;
    const startY = mouseY < item.start.y ? mouseY : item.start.y;
    const endX = mouseX >= item.start.x ? mouseX : item.start.x;
    const endY = mouseY >= item.start.y ? mouseY : item.start.y;
    const radiusX = (endX - startX) * 0.5;
    const radiusY = (endY - startY) * 0.5;
    const centerX = startX + radiusX;
    const centerY = startY + radiusY;

    const x0 = centerX + (endX - centerX)/6
    const y0 = centerY + (endY - centerY)/6
    const r0 = radiusX/6
    const x1 = centerX + (endX - centerX)/5
    const y1 = centerY + (endY - centerY)/5
    const r1 = radiusY/5

    console.log("x0", x0, "y0", y0, "r0", r0, "x1", x1, "y1", y1, "r1", r1);

    console.log("startX", startX, "startY", startY, "endX", endX, "endY", endY, "radiusX", radiusX, "radiusY", radiusY, "centerX", centerX, "centerY", centerY, "mouseX", mouseX, "mouseY", mouseY, "x", item.start.x, "y", item.start.y, r0);

    let myGradient = context.createRadialGradient(x0, y0, r0, x1, y1, y1)

    myGradient.addColorStop(0, item.color);
    myGradient.addColorStop(0.4, "rgba(255, 255, 255, 0.2)");
    myGradient.addColorStop(0.6, "rgba(255, 255, 255, 0.0)");
    myGradient.addColorStop(1, "rgba(255, 255, 255, 0.0)");


    context.save();
    context.beginPath();
    // context.lineWidth = item.size;
    context.globalAlpha = 0.5
    // context.strokeStyle = item.color;
    context.fillStyle = myGradient;

    if (typeof context.ellipse === 'function') {
      // debugger
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    } else {

      drawEllipsePolifyll(centerX, centerY, radiusX, radiusY);
    }
    // context.stroke();
    if (item.color)
    context.closePath();
    context.fill();
    context.restore();
  };

  const onMouseMove = (x, y) => {
    if (!ellipse) return;
    console.log("onMouseMoveElipse", x, y);
    context.putImageData(imageData, 0, 0);
    drawEllipse(ellipse, x, y);
  };

  const onMouseUp = (x, y) => {
    if (!ellipse) return;
    onMouseMove(x, y);
    const item = ellipse;
    imageData = null;
    ellipse = null;
    item.end = { x, y };
    return [item];
  };

  const draw = (item) => drawEllipse(item, item.end.x, item.end.y);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    draw
  };
};
