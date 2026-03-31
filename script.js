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
});
