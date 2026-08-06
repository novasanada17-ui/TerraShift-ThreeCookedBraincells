document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switcher Sync for Background 
    const darkBg = document.getElementById('bgMediaDark');
    const lightBg = document.getElementById('bgMediaLight');
    const themeToggleBtn = document.getElementById('themeToggle');

    function updateBgMedia() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            if (darkBg) darkBg.classList.remove('active');
            if (lightBg) lightBg.classList.add('active');
        } else {
            if (lightBg) lightBg.classList.remove('active');
            if (darkBg) darkBg.classList.add('active');
        }
    }

    updateBgMedia();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            setTimeout(updateBgMedia, 50);
        });
    }

    // 2. Interactive 3D Card 
    const cards = document.querySelectorAll('.paper-card');

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 3. Floating Glowing Particles
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.fadeSpeed = Math.random() * 0.004 + 0.002;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.fadeSpeed;

            if (this.alpha <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(16, 185, 129, ${this.alpha})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#10b981';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function renderParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(renderParticles);
    }
    renderParticles();
});