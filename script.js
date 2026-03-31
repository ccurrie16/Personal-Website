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
