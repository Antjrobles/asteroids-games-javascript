const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');      // ctx = context 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


ctx.fillStyle = 'black';  // color
ctx.fillRect(0, 0, canvas.width, canvas.height)  // x, y, width, height


class Player {
  constructor({ position, velocity }) {
    this.position = position;  // { x: 0, y: 0 }
    this.velocity = velocity
  }
};


const player = new Player({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
});

console.log(player);
