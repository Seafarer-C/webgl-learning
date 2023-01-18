export const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "900px";
canvas.width = 500;
canvas.height = 500;
canvas.style.width = "300px";
canvas.style.height = "300px";
canvas.style.backgroundColor = "#fff";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "cloth-texture.jpg";

img.onload = () => {
  ctx?.drawImage(img, 0, 0);
  console.log(img.width, img.height);

  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillRect(100, 100, 100, 100);
  // ctx.fillRect(0, 2000, 1000, 1000);
  // ctx.fillRect(2000, 2000, 1000, 1000);
  // ctx.fillRect(2000, 0, 1000, 1000);
};
