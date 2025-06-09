const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 100;
let origin = { x: 0, y: 0 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  origin.x = canvas.width * 0.2;  // 1/5 da largura
  origin.y = canvas.height * 0.5; // metade da altura
}

window.addEventListener("resize", () => {
  resizeCanvas();
});

resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.radius = Math.random() * 2 + 1;

    // ângulo e distância inicial para distribuição radial
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * canvas.width * 0.25; // começa perto do centro

    this.x = origin.x + Math.cos(angle) * distance;
    this.y = origin.y + Math.sin(angle) * distance;

    const speedBase = Math.random() * 0.3 + 0.1;
    this.vx = Math.cos(angle) * speedBase;
    this.vy = Math.sin(angle) * speedBase;

    this.maxDistance = canvas.width;
    this.opacity = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    const dx = this.x - origin.x;
    const dy = this.y - origin.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this.opacity = 1 - dist / this.maxDistance;
    this.opacity = Math.max(this.opacity, 0);
  }

  isInvisible() {
    return this.opacity <= 0.01;
  }

  draw() {
    if (this.opacity <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 73, 219, ${this.opacity})`;
    ctx.fill();
  }
}

// inicializa as partículas
for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();

    if (p.isInvisible()) {
      particles.splice(i, 1); // remove
      particles.push(new Particle()); // adiciona nova
    }
  }

  requestAnimationFrame(animate);
}

animate();