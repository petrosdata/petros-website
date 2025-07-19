document.addEventListener('DOMContentLoaded', function() {
  initParticles();
});

function initParticles() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  // Create canvas for particles
  const canvas = document.createElement('canvas');
  canvas.className = 'particles-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  
  heroSection.appendChild(canvas);
  
  // Set canvas dimensions
  canvas.width = heroSection.offsetWidth;
  canvas.height = heroSection.offsetHeight;
  
  const ctx = canvas.getContext('2d');
  
  // Particle properties
  const particles = [];
  const particleCount = 25; // Reduced count for better performance
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * Math.PI
    });
  }
  
  // Animation loop
  function animate() {
    // Check if canvas still exists in the DOM
    if (!document.body.contains(canvas)) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      // Draw crystal-like particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      // Crystal gradient
      const gradient = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
      gradient.addColorStop(0, `rgba(64, 224, 208, ${p.opacity})`);
      gradient.addColorStop(1, `rgba(123, 63, 140, ${p.opacity})`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Diamond shape
      ctx.moveTo(0, -p.size);
      ctx.lineTo(p.size, 0);
      ctx.lineTo(0, p.size);
      ctx.lineTo(-p.size, 0);
      ctx.closePath();
      
      ctx.fill();
      ctx.restore();
      
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Slow rotation
      p.rotation += 0.002;
      
      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    
    requestAnimationFrame(animate);
  }
  
  // Handle resize
  window.addEventListener('resize', function() {
    if (canvas) {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    }
  });
  
  // Start animation
  animate();
}

// Create crystal decoration shapes for background enhancement
function createCrystalDecorations() {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach((section, index) => {
    // Add 2-3 crystal shapes per section as decorative elements
    const shapeCount = 2 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < shapeCount; i++) {
      const decoration = document.createElement('div');
      decoration.className = 'crystal-decoration float';
      
      // Randomize position but keep within bounds
      const posX = 5 + Math.random() * 90; // 5% to 95% of section width
      const posY = 10 + Math.random() * 80; // 10% to 90% of section height
      
      // Set size between 30px and 80px
      const size = 30 + Math.random() * 50;
      
      // Style the decoration
      decoration.style.position = 'absolute';
      decoration.style.width = `${size}px`;
      decoration.style.height = `${size}px`;
      decoration.style.left = `${posX}%`;
      decoration.style.top = `${posY}%`;
      decoration.style.opacity = '0.05'; // Very subtle
      decoration.style.transform = `rotate(${Math.random() * 45}deg)`;
      decoration.style.borderRadius = '4px';
      decoration.style.background = 'linear-gradient(135deg, var(--accent-teal), var(--accent-purple))';
      decoration.style.zIndex = '0';
      decoration.style.pointerEvents = 'none';
      
      // Alternate between diamond and hexagon shapes using clip-path
      if (i % 2 === 0) {
        decoration.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      } else {
        decoration.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      }
      
      // Different animation duration and delay for each
      decoration.style.animationDuration = (6 + Math.random() * 4) + 's';
      decoration.style.animationDelay = (Math.random() * 2) + 's';
      
      // Add to section
      if (section.style.position !== 'relative') {
        section.style.position = 'relative';
        section.style.overflow = 'hidden';
      }
      
      section.appendChild(decoration);
    }
  });
}

// Initialize crystal decorations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Delay a bit to ensure other scripts have run
  setTimeout(createCrystalDecorations, 100);
});
