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
    this.rotation = 0
  }

  draw() {
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.rotation)
    ctx.translate(-this.position.x, -this.position.y)

    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
    ctx.fillStyle = 'red'
    ctx.fill()

    //     ctx.fillStyle = 'red';
    //     ctx.fillRect(this.position.x, this.position.y, 100, 100);
    ctx.beginPath()
    ctx.moveTo(this.position.x + 30, this.position.y);
    ctx.lineTo(this.position.x - 10, this.position.y - 10)
    ctx.lineTo(this.position.x - 10, this.position.y + 10)
    ctx.closePath()

    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.restore() 
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});


const keys = {
  ArrowUp: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
}

const SPEED = 3
const ROTATIONAL_SPEED = 0.05
const FRICTION = 0.97

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black'; // color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // x, y, width, height
  player.update();


  if (keys.ArrowUp.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED
    player.velocity.y = Math.sin(player.rotation) * SPEED
  } else if (!keys.ArrowUp.pressed) {
    player.velocity.x *= FRICTION
    player.velocity.y *= FRICTION
  }


  if (keys.ArrowRight.pressed) player.rotation += ROTATIONAL_SPEED
    else if (keys.ArrowLeft.pressed) player.rotation -= ROTATIONAL_SPEED

}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      keys.ArrowUp.pressed = true;
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      break
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break
  }
});