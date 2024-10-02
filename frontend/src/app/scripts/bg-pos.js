let cursorPosition = { x: 0, y: 0 };
document.addEventListener('mousemove', (event) => {
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;

    document.documentElement.style.setProperty('--cursor-x', cursorPosition.x + 'px');
    document.documentElement.style.setProperty('--cursor-y', cursorPosition.y + 'px');
    console.log(cursorPosition.x, cursorPosition.y);
})