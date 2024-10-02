let cursorPosition = { x: 0, y: 0 };
let animationFrameId;

const style = getComputedStyle(document.body);

function updateCursorPosition() {
    style.setProperty('--cursor-x', cursorPosition.x + '%');
    style.setProperty('--cursor-y', cursorPosition.y + '%');
    animationFrameId = requestAnimationFrame(updateCursorPosition);

    console.log(style.getPropertyValue('--cursor-x'));
    console.log(style.getPropertyValue('--cursor-y'));
}

document.addEventListener('mousemove', (event) => {
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;
    // Only start the animation if it's not already running.
    if (!animationFrameId) {
        updateCursorPosition();
    }
});

// Stop the animation if the mouse stops moving.  Could be improved with a timeout
document.addEventListener('mouseout', () => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
});