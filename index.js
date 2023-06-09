const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');      // ctx = context 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


ctx.fillStyle = 'black';  // color
ctx.fillRect(0, 0, canvas.width, canvas.height)  // x, y, width, height

console.log(ctx);