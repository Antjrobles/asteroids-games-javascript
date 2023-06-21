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

    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath()

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

class Projectile {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.radius = 5
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fillStyle = 'white'
    ctx.fill()
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Asteroid {
  constructor({ position, velocity, radius }) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.strokeStyle = 'white'
    ctx.stroke()
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
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
const PROJECTILE_SPEED = 5

const projectiles = [];
const asteroids = [];

window.setInterval(() => {
  const index = Math.floor(Math.random() * 4)
  let x, y
  let vx, vy
  let radius = 50 * Math.random() + 10;

  switch (index) {
    case 0: // left side of the screen
      x = 0 - radius
      y = Math.random() * canvas.height
      vx = 1
      vy = 0
      break
    case 1: // bottom side of the screen
      x = Math.random() * canvas.width
      y = canvas.height + radius
      vx = 0
      vy = -1
      break
    case 2: // right side of the screen
      x = canvas.width + radius
      y = Math.random() * canvas.height
      vx = -1
      vy = 0
      break
    case 3: // top side of the screen
      x = Math.random() * canvas.width
      y = 0 - radius
      vx = 0
      vy = 1
      break
    
  }


  asteroids.push(new Asteroid({
    position: {
      x: x,
      y: y,
    },
    velocity: {
      x: vx,
      y: vy,
    },
    radius,
  }))
}, 4000)

function circleCollision(circle1, circle2) {
  const xDifference = circle2.position.x - circle1.position.x;
  const yDifference = circle2.position.y - circle1.position.y;

  const distance = Math.sqrt(xDifference * xDifference + yDifference * yDifference);

  if (distance <= circle1.radius + circle2.radius) {
    return true
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black'; // color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // x, y, width, height
  player.update();



  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i]
    projectile.update()

    // GARBAGE COLLECTION FOR PROJECTILES
    if (
      projectile.position.x + projectile.radius < 0 ||
      projectile.position.x - projectile.radius > canvas.width ||
      projectile.position.y - projectile.radius > canvas.height ||
      projectile.position.y + projectile.radius < 0
    ) {
      projectiles.splice(i, 1)
    }
  }
  // ASTEROID MANAGEMENT
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i]
    asteroid.update()


    // GARBAGE COLLECTION FOR ASTEROIDS
    if (
      asteroid.position.x + asteroid.radius < 0 ||
      asteroid.position.x - asteroid.radius > canvas.width ||
      asteroid.position.y - asteroid.radius > canvas.height ||
      asteroid.position.y + asteroid.radius < 0
    ) {
      asteroids.splice(i, 1)
    }
      // FOR PROJECTILES
      for (let j = projectiles.length - 1; j >= 0; j--) {
        const projectile = projectiles[j]
        
        if (circleCollision(asteroid, projectile)) {
          asteroids.splice(i, 1)
          projectiles.splice(j, 1)
  
        }
      }

  }

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
    case 'Space':
      projectiles.push(new Projectile({
        position: {
          x: player.position.x + Math.cos(player.rotation) * 30,
          y: player.position.y + Math.sin(player.rotation) * 30,
        },
        velocity: {
          x: Math.cos(player.rotation) * PROJECTILE_SPEED,
          y: Math.sin(player.rotation) * PROJECTILE_SPEED,
        }
      }))
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