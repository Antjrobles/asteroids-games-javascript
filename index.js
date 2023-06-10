const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // ctx = context

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = 'black'; // color
ctx.fillRect(0, 0, canvas.width, canvas.height); // x, y, width, height

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
      ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
      ctx.fillStyle = 'red'
      ctx.fill()

//     ctx.fillStyle = 'red';
//     ctx.fillRect(this.position.x, this.position.y, 100, 100);
      ctx.moveTo(this.position.x + 30, this.position.y);
      ctx.lineTo(this.position.x -15, this.position.y - 15)
      ctx.lineTo(this.position.x -15, this.position.y + 15)
      ctx.closePath()

      ctx.strokeStyle= 'white'
      ctx.stroke()
  }
}

const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

player.draw();

console.log(ctx);