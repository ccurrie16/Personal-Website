document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('#about-me h1');
    const text = h1.textContent;
    h1.textContent = '';

    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    cursor.textContent = '|';
    h1.appendChild(cursor);

    let i = 0;
    function type() {
        if (i < text.length) {
            cursor.insertAdjacentText('beforebegin', text[i]);
            i++;
            setTimeout(type, 75);
        } else {
            cursor.classList.add('typing-cursor--done');
        }
    }

    setTimeout(type, 400);

    // Gradient wave background
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let t = 0;

    function animate() {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const WAVES = 3;
        for (let wi = 0; wi < WAVES; wi++) {
            const offset = (t * 0.4 + wi * (Math.PI * 2 / WAVES));
            const yBase = h * (0.3 + wi * 0.2);
            const amp = h * 0.07;

            ctx.beginPath();
            ctx.moveTo(0, h);
            for (let x = 0; x <= w; x += 4) {
                const y = yBase + Math.sin(x / w * Math.PI * 2 + offset) * amp
                                + Math.sin(x / w * Math.PI * 4 + offset * 1.3) * amp * 0.4;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(w, h);
            ctx.closePath();

            const alpha = 0.06 - wi * 0.015;
            ctx.fillStyle = `rgba(196, 127, 90, ${alpha})`;
            ctx.fill();
        }

        t += 0.02;
        requestAnimationFrame(animate);
    }
    animate();

    // Scroll-reveal
    const revealEls = document.querySelectorAll('.project-card, #my-projects, #socials, .social-card, #skills');
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

    // Staggered skill tags
    const skillsSection = document.querySelector('#skills');
    const skillTags = document.querySelectorAll('.skill-tag');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillTags.forEach((tag, i) => {
                    setTimeout(() => tag.classList.add('reveal--visible'), i * 80);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
});
