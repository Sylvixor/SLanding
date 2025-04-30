const canvas = document.getElementById("bg") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
let width = window.innerWidth * window.devicePixelRatio;
let height = window.innerHeight * window.devicePixelRatio;
canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  width = window.innerWidth * window.devicePixelRatio;
  height = window.innerHeight * window.devicePixelRatio;
  canvas.width = width;
  canvas.height = height;
});

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

const storedParticles = localStorage.getItem("particles");
if (storedParticles) {
  const parsedParticles = JSON.parse(storedParticles);
  parsedParticles.forEach((p: Particle) => {
    particles.push(p);
  });
} else {
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      hueOffset: Math.random() * 60,
      alpha: 0,
    });
  }
}

function animate() {
    ctx.fillStyle = "rgb(10, 10, 26)";
    ctx.fillRect(0, 0, width, height);
  
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
  
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
  
      if (p.alpha < 1) p.alpha += 0.01;
  
      const hue = (blurple.h + p.hueOffset) % 360;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${hue}, ${blurple.s}%, ${blurple.l}%, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  
    localStorage.setItem("particles", JSON.stringify(particles));
    requestAnimationFrame(animate);
  }

animate();

window.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("center-image");
    if (image) {
      image.addEventListener("click", () => {
        window.open("https://your-link-here.com", "_blank");
      });
    }
  });