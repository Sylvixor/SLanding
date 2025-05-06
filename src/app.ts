const canvas = document.getElementById("bg") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const logicalWidth = window.innerWidth;
  const logicalHeight = window.innerHeight;

  canvas.style.width = `${logicalWidth}px`;
  canvas.style.height = `${logicalHeight}px`;
  canvas.width = logicalWidth * dpr;
  canvas.height = logicalHeight * dpr;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hueOffset: number;
  alpha: number;
}

const particles: Particle[] = [];
const blurple = { h: 260, s: 100, l: 70 };

const dpr = window.devicePixelRatio || 1;
const referenceDPR = 2;
const scaleFactor = dpr / referenceDPR;
const speedFactor = Math.pow(scaleFactor, 1);
const densityAdjustment = Math.pow(referenceDPR / dpr, 0.8);
const baseAreaPerParticle = 14000 * densityAdjustment;

const numParticles = Math.floor((window.innerWidth * window.innerHeight) / baseAreaPerParticle);

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.2 * speedFactor,
    vy: (Math.random() - 0.5) * 0.2 * speedFactor,
    radius: (Math.random() * 1.5 + 0.5) * Math.pow(scaleFactor, 0.3),
    hueOffset: Math.random() * 60,
    alpha: 0,
  });
}

function animate() {
  ctx.fillStyle = "rgb(10, 10, 26)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

    if (p.alpha < 1) p.alpha += 0.01;

    const hue = (blurple.h + p.hueOffset) % 360;

    ctx.beginPath();
    ctx.shadowBlur = p.radius * 4;
    ctx.shadowColor = `hsla(${hue}, ${blurple.s}%, ${blurple.l}%, ${p.alpha})`;
    ctx.fillStyle = `hsla(${hue}, ${blurple.s}%, ${blurple.l}%, ${p.alpha})`;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("welcome-image") as HTMLImageElement;
  if (image) {
    image.addEventListener("click", () => {
      window.open("https://homebrew.sylvixor.com", "_blank");
    });
  }

  const welcome = document.getElementById("welcome-container");
  if (welcome) {
    setTimeout(() => {
      welcome.style.visibility = "visible";
      welcome.style.animation = "fadeInUp 1.6s ease-out forwards";
    }, 50);
  }
});