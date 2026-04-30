document.addEventListener('DOMContentLoaded', () => {
  const typed = new Typed('.typed-text', {
    strings: ['Software Developer', 'AI Enthusiast', 'Problem Solver'],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: false
  });

  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      
      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  };
  
  const initParticles = () => {
    particles = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3 + 0.1
      });
    }
  };
  
  const drawParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(122, 78, 45, ${p.alpha})`;
      ctx.fill();
    });
    
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(122, 78, 45, ${0.08 * (1 - dist / 150)})`;
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(drawParticles);
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateNumber = (element) => {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 30;
    
    const updateNumber = () => {
      current += increment;
      
      if (current < target) {
        element.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = target + '+';
      }
    };
    
    updateNumber();
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(num => statsObserver.observe(num));
});